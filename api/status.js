import { getCreditRecord, sendApiError, verifySessionToken } from "./_credits.js";

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
    const record = await getCreditRecord(session.licenseHash);
    if (!record) {
      response.status(404).json({ ok: false, message: "Volvé a ingresar tu license key." });
      return;
    }

    response.status(200).json({
      ok: true,
      credits: Number(record.remaining || 0),
      issuedCredits: Number(record.issuedCredits || 0)
    });
  } catch (error) {
    console.error(error);
    sendApiError(response, error);
  }
}
