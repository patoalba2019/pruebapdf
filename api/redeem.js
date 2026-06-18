function readCodes() {
  return (process.env.PURCHASE_CODES || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [code, credits] = entry.split(":");
      return {
        code: String(code || "").trim().toUpperCase(),
        credits: Number(credits || 1)
      };
    })
    .filter((entry) => entry.code && Number.isFinite(entry.credits));
}

export default function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, message: "Método no disponible." });
    return;
  }

  const submitted = String(request.body?.code || "").trim().toUpperCase();
  if (!submitted) {
    response.status(400).json({ ok: false, message: "Ingresá tu código de compra." });
    return;
  }

  const match = readCodes().find((entry) => entry.code === submitted);
  if (!match) {
    response.status(404).json({
      ok: false,
      message: "No encontramos ese código. Revisá que esté escrito igual al recibido."
    });
    return;
  }

  response.status(200).json({
    ok: true,
    credits: match.credits,
    token: Buffer.from(`${submitted}:${match.credits}:${Date.now()}`).toString("base64")
  });
}
