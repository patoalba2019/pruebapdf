import { consumeCredit, sendApiError, verifySessionToken } from "./_credits.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, message: "Método no disponible." });
    return;
  }

  const session = verifySessionToken(request.body?.token);
  if (!session) {
    response.status(401).json({ ok: false, message: "Volvé a ingresar tu license key." });
    return;
  }

  try {
    const remaining = await consumeCredit(session.licenseHash);
    if (remaining === -2) {
      response.status(404).json({ ok: false, message: "Volvé a ingresar tu license key." });
      return;
    }
    if (remaining === -1) {
      response.status(402).json({ ok: false, message: "Ya usaste todos los créditos de este código." });
      return;
    }

    response.status(200).json({ ok: true, credits: remaining });
  } catch (error) {
    console.error(error);
    sendApiError(response, error);
  }
}
