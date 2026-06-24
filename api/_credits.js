import crypto from "node:crypto";

const LEMON_LICENSE_API = "https://api.lemonsqueezy.com/v1/licenses";
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 30;

function env(name) {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

function jsonResponse(response, status, payload) {
  response.status(status).json(payload);
}

function getSecret() {
  return (
    env("APP_SECRET") ||
    env("LEMON_SQUEEZY_WEBHOOK_SECRET") ||
    env("LEMON_SQUEEZY_API_KEY") ||
    "pruebapdf-development-secret"
  );
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function signPayload(payload) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function normalizeLicenseKey(value) {
  return String(value || "").trim();
}

export function hashLicenseKey(licenseKey) {
  return crypto.createHash("sha256").update(normalizeLicenseKey(licenseKey).toUpperCase()).digest("hex");
}

export function createSessionToken(licenseHash) {
  const payload = JSON.stringify({
    licenseHash,
    exp: Date.now() + TOKEN_TTL_MS
  });
  const encoded = base64url(payload);
  return `${encoded}.${signPayload(encoded)}`;
}

export function verifySessionToken(token) {
  const [encoded, signature] = String(token || "").split(".");
  if (!encoded || !signature) return null;
  const expected = signPayload(encoded);
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (!payload.licenseHash || Number(payload.exp) < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function kvConfig() {
  const url = env("KV_REST_API_URL");
  const token = env("KV_REST_API_TOKEN");
  if (!url || !token) return null;
  return { url, token };
}

export function hasKv() {
  return Boolean(kvConfig());
}

async function kvCommand(command) {
  const config = kvConfig();
  if (!config) {
    throw new Error("KV_NOT_CONFIGURED");
  }

  const result = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });

  const data = await result.json().catch(() => ({}));
  if (!result.ok || data.error) {
    throw new Error(data.error || `KV_ERROR_${result.status}`);
  }
  return data.result;
}

export async function getCreditRecord(licenseHash) {
  const raw = await kvCommand(["GET", `license:${licenseHash}`]);
  if (!raw) return null;
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function setCreditRecord(licenseHash, record) {
  await kvCommand(["SET", `license:${licenseHash}`, JSON.stringify(record)]);
}

export async function consumeCredit(licenseHash) {
  const script = `
    local raw = redis.call("GET", KEYS[1])
    if not raw then
      return -2
    end

    local data = cjson.decode(raw)
    local remaining = tonumber(data["remaining"] or 0)
    if remaining <= 0 then
      return -1
    end

    remaining = remaining - 1
    data["remaining"] = remaining
    data["updatedAt"] = ARGV[1]
    redis.call("SET", KEYS[1], cjson.encode(data))
    return remaining
  `;

  return Number(await kvCommand(["EVAL", script, 1, `license:${licenseHash}`, new Date().toISOString()]));
}

async function lemonRequest(path, body) {
  const result = await fetch(`${LEMON_LICENSE_API}/${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(body)
  });

  const data = await result.json().catch(() => ({}));
  if (!result.ok && path === "validate") {
    return {
      valid: false,
      error: data.error || data.message || `LEMON_ERROR_${result.status}`
    };
  }
  if (!result.ok) {
    const message = data.error || data.message || `LEMON_ERROR_${result.status}`;
    throw new Error(message);
  }
  return data;
}

export async function validateLemonLicense(licenseKey) {
  return lemonRequest("validate", { license_key: licenseKey });
}

export async function activateLemonLicense(licenseKey) {
  return lemonRequest("activate", {
    license_key: licenseKey,
    instance_name: "PruebaPDF"
  });
}

function csvIncludes(csv, value) {
  const normalized = String(value || "");
  return String(csv || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .includes(normalized);
}

export function creditsForLicense(meta = {}) {
  const productId = String(meta.product_id || "");
  const variantId = String(meta.variant_id || "");
  const label = `${meta.product_name || ""} ${meta.variant_name || ""}`.toLowerCase();

  if (
    csvIncludes(env("LEMON_SQUEEZY_PACK20_PRODUCT_ID"), productId) ||
    csvIncludes(env("LEMON_SQUEEZY_PACK20_VARIANT_ID"), variantId) ||
    label.includes("pack de 20") ||
    label.includes("pack 20") ||
    label.includes("20")
  ) {
    return 20;
  }

  if (
    csvIncludes(env("LEMON_SQUEEZY_PACK5_PRODUCT_ID"), productId) ||
    csvIncludes(env("LEMON_SQUEEZY_PACK5_VARIANT_ID"), variantId) ||
    label.includes("pack de 5") ||
    label.includes("pack 5")
  ) {
    return 5;
  }

  if (
    csvIncludes(env("LEMON_SQUEEZY_INDIVIDUAL_PRODUCT_ID"), productId) ||
    csvIncludes(env("LEMON_SQUEEZY_INDIVIDUAL_VARIANT_ID"), variantId) ||
    label.includes("individual")
  ) {
    return 1;
  }

  return 1;
}

export function licenseMeta(data = {}) {
  return data.meta || data.license_key || {};
}

export function sendApiError(response, error) {
  if (error.message === "KV_NOT_CONFIGURED") {
    jsonResponse(response, 500, {
      ok: false,
      message: "Falta configurar el almacenamiento de créditos en Vercel."
    });
    return;
  }

  jsonResponse(response, 500, {
    ok: false,
    message: "No pudimos completar la operación. Probá de nuevo en unos minutos."
  });
}
