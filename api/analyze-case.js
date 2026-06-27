const DEFAULT_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
const MAX_STORY_CHARS = 3500;
const MAX_FILE_TEXT_CHARS = 1200;
const TIMEOUT_MS = 9500;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 12;

const ipHits = new Map();

function env(name) {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

function isEnabled() {
  return env("AI_ANALYSIS_ENABLED") === "true" && env("CLOUDFLARE_ACCOUNT_ID") && env("CLOUDFLARE_AI_TOKEN");
}

function cleanText(value, maxLength) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function clientIp(request) {
  return (
    request.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    request.headers["x-real-ip"] ||
    "unknown"
  );
}

function rateLimit(request) {
  const key = clientIp(request);
  const now = Date.now();
  const hit = ipHits.get(key) || { count: 0, resetAt: now + WINDOW_MS };
  if (hit.resetAt < now) {
    hit.count = 0;
    hit.resetAt = now + WINDOW_MS;
  }
  hit.count += 1;
  ipHits.set(key, hit);
  return hit.count <= MAX_REQUESTS_PER_WINDOW;
}

function safePayload(body = {}) {
  const files = Array.isArray(body.files) ? body.files : [];
  return {
    language: body.language === "en" ? "en" : "es",
    story: cleanText(body.story, MAX_STORY_CHARS),
    optional: {
      date: cleanText(body.optional?.date, 80),
      party: cleanText(body.optional?.party, 120),
      reference: cleanText(body.optional?.reference, 120),
      attempt: cleanText(body.optional?.attempt, 600)
    },
    localSignals: {
      dates: Array.isArray(body.localSignals?.dates) ? body.localSignals.dates.slice(0, 6) : [],
      amounts: Array.isArray(body.localSignals?.amounts) ? body.localSignals.amounts.slice(0, 6) : [],
      references: Array.isArray(body.localSignals?.references) ? body.localSignals.references.slice(0, 6) : [],
      localCaseId: cleanText(body.localSignals?.localCaseId, 80),
      localConfidence: Number(body.localSignals?.localConfidence || 0)
    },
    files: files.slice(0, 8).map((file) => ({
      title: cleanText(file.title, 120),
      type: cleanText(file.type, 80),
      role: cleanText(file.role, 80),
      date: cleanText(file.date, 80),
      nameHint: cleanText(file.nameHint, 100),
      text: cleanText(file.text, MAX_FILE_TEXT_CHARS)
    })),
    allowedCaseIds: Array.isArray(body.allowedCaseIds) ? body.allowedCaseIds.map((id) => cleanText(id, 80)).filter(Boolean) : []
  };
}

function systemPrompt(allowedCaseIds) {
  return `
You are a cautious case-organization classifier for CasoClaro.
Return only strict JSON. Do not invent facts. If a fact is not in the user text, do not include it.
Allowed caseId values: ${allowedCaseIds.join(", ")}.
If none fits, use caseId "unknown" and confidence below 0.45.

Important rules:
- Never default to online purchase.
- For "me vino mucho en la boleta de luz", classify as high_utility_bill, not online_not_arrived.
- Distinguish utility/service bills, unknown card charges, duplicate payments, rejected warranty, service delays, rent, procedures and online purchases.
- Each fact must include source: "story", "file", "txt", "local_signal" or "possible".
- Use "possible" only when cautious and mark confidence below 0.7.
- Do not mention seller, shipping, delivery or product unless the user or file text mentions them.

JSON schema:
{
  "caseId": "one allowed id or unknown",
  "confidence": 0.0,
  "needsConfirmation": true,
  "confirmationQuestion": "short question in the user's language",
  "title": "short clear title",
  "summary": "brief summary without invented facts",
  "mainRequest": "what the user can ask for",
  "facts": [{"title":"", "detail":"", "source":"story", "confidence":0.0}],
  "missingData": [""],
  "recommendedFiles": [""],
  "doNotAssume": [""]
}`;
}

function validateAnalysis(value, allowedCaseIds) {
  const analysis = value && typeof value === "object" ? value : {};
  const allowed = new Set([...allowedCaseIds, "unknown"]);
  const caseId = allowed.has(String(analysis.caseId || "")) ? String(analysis.caseId || "") : "unknown";
  const confidence = Math.max(0, Math.min(1, Number(analysis.confidence || 0)));
  return {
    caseId,
    confidence,
    needsConfirmation: Boolean(analysis.needsConfirmation || confidence < 0.75),
    confirmationQuestion: cleanText(analysis.confirmationQuestion, 180),
    title: cleanText(analysis.title, 120),
    summary: cleanText(analysis.summary, 900),
    mainRequest: cleanText(analysis.mainRequest, 240),
    facts: Array.isArray(analysis.facts)
      ? analysis.facts.slice(0, 8).map((fact) => ({
          title: cleanText(fact.title, 140),
          detail: cleanText(fact.detail, 500),
          source: ["story", "file", "txt", "local_signal", "possible"].includes(fact.source) ? fact.source : "possible",
          confidence: Math.max(0, Math.min(1, Number(fact.confidence || 0)))
        }))
      : [],
    missingData: Array.isArray(analysis.missingData) ? analysis.missingData.slice(0, 6).map((item) => cleanText(item, 180)).filter(Boolean) : [],
    recommendedFiles: Array.isArray(analysis.recommendedFiles) ? analysis.recommendedFiles.slice(0, 6).map((item) => cleanText(item, 180)).filter(Boolean) : [],
    doNotAssume: Array.isArray(analysis.doNotAssume) ? analysis.doNotAssume.slice(0, 6).map((item) => cleanText(item, 180)).filter(Boolean) : []
  };
}

function normalizedText(payload) {
  return [
    payload.story,
    payload.optional?.party,
    payload.optional?.reference,
    payload.optional?.attempt,
    ...(payload.files || []).map((file) => `${file.title || ""} ${file.nameHint || ""} ${file.text || ""}`)
  ]
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function hasAny(text, words) {
  return words.some((word) => text.includes(word));
}

function enforceSafeOverrides(analysis, payload) {
  const text = normalizedText(payload);
  const patch = (caseId, title, mainRequest, missingData = []) => ({
    ...analysis,
    caseId,
    title: analysis.title || title,
    mainRequest: analysis.mainRequest || mainRequest,
    missingData: analysis.missingData?.length ? analysis.missingData : missingData,
    needsConfirmation: analysis.confidence < 0.75,
    confidence: Math.max(analysis.confidence, 0.72)
  });

  const mentionsServiceIncrease = hasAny(text, ["aumentaron internet", "aumento de internet", "me subieron el plan", "cambio de plan"]);
  const mentionsServiceNoNotice = text.includes("sin avisar") && hasAny(text, ["internet", "plan", "abono", "cable", "servicio"]);
  if (mentionsServiceIncrease || mentionsServiceNoNotice) {
    return patch(
      "service_price_increase",
      payload.language === "en" ? "Service price increase or plan change" : "Aumento o cambio de servicio",
      payload.language === "en" ? "Request a review of the charge or plan change." : "Pedir revisión del aumento o cambio de plan.",
      payload.language === "en" ? ["Current bill", "Previous bill", "Plan details"] : ["Factura actual", "Factura anterior", "Detalle del plan"]
    );
  }

  if (hasAny(text, ["boleta de luz", "factura de luz", "electricidad", "factura alta", "boleta alta", "vino mucho", "vino muy alto"])) {
    return patch(
      "high_utility_bill",
      payload.language === "en" ? "High utility or service bill" : "Factura o boleta con importe alto",
      payload.language === "en" ? "Request a billing review and explanation." : "Pedir revisión y explicación de la facturación.",
      payload.language === "en" ? ["Amount", "Billing period", "Usage", "Previous bill"] : ["Importe", "Período", "Consumo", "Boleta anterior"]
    );
  }

  if (hasAny(text, ["no reconozco", "cargo desconocido", "cobro desconocido", "me cobraron algo", "duplicado", "dos veces"])) {
    return patch(
      "duplicate_unknown_charge",
      payload.language === "en" ? "Incorrect or unknown charge" : "Cobro incorrecto o cargo desconocido",
      payload.language === "en" ? "Request a review of the charge." : "Pedir revisión del cobro.",
      payload.language === "en" ? ["Charge screenshot", "Date", "Amount"] : ["Captura del cobro", "Fecha", "Importe"]
    );
  }

  if (hasAny(text, ["rechazaron la garantia", "garantia rechazada", "rechazaron la devolucion", "devolucion rechazada"])) {
    return patch(
      "warranty_rejected",
      payload.language === "en" ? "Warranty or return rejected" : "Garantía o devolución rechazada",
      payload.language === "en" ? "Request a new review or explanation." : "Pedir nueva revisión o explicación.",
      payload.language === "en" ? ["Rejection response", "Invoice", "Photos"] : ["Respuesta de rechazo", "Factura", "Fotos"]
    );
  }

  return analysis;
}

async function callCloudflare(payload) {
  const accountId = env("CLOUDFLARE_ACCOUNT_ID");
  const token = env("CLOUDFLARE_AI_TOKEN");
  const model = env("CLOUDFLARE_AI_MODEL") || DEFAULT_MODEL;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const result = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt(payload.allowedCaseIds) },
          { role: "user", content: JSON.stringify(payload) }
        ],
        response_format: { type: "json_object" },
        max_tokens: 900
      }),
      signal: controller.signal
    });
    const data = await result.json().catch(() => ({}));
    if (!result.ok || data.success === false) {
      return { ok: false, fallback: true, status: result.status };
    }
    const raw = data.result?.response || data.result?.text || data.result;
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    const analysis = validateAnalysis(parsed, payload.allowedCaseIds);
    return { ok: true, analysis: enforceSafeOverrides(analysis, payload) };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, message: "Method not allowed" });
    return;
  }

  if (!isEnabled()) {
    response.status(200).json({ ok: false, disabled: true, fallback: true });
    return;
  }

  if (!rateLimit(request)) {
    response.status(429).json({ ok: false, fallback: true });
    return;
  }

  try {
    const payload = safePayload(request.body || {});
    if (!payload.story) {
      response.status(400).json({ ok: false, fallback: true });
      return;
    }
    const result = await callCloudflare(payload);
    if (!result.ok || result.analysis.caseId === "unknown" || result.analysis.confidence < 0.45) {
      response.status(200).json({ ok: false, fallback: true });
      return;
    }
    response.status(200).json({ ok: true, analysis: result.analysis });
  } catch {
    response.status(200).json({ ok: false, fallback: true });
  }
}
