import {
  activateLemonLicense,
  createSessionToken,
  creditsForLicense,
  getCreditRecord,
  hashLicenseKey,
  hasKv,
  licenseMeta,
  normalizeLicenseKey,
  sendApiError,
  setCreditRecord,
  validateLemonLicense
} from "./_credits.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, message: "Método no disponible." });
    return;
  }

  const licenseKey = normalizeLicenseKey(request.body?.code);
  if (!licenseKey) {
    response.status(400).json({ ok: false, message: "Ingresá tu license key o código de compra." });
    return;
  }

  if (!hasKv()) {
    response.status(500).json({
      ok: false,
      message: "Falta conectar el almacenamiento de créditos en Vercel."
    });
    return;
  }

  const licenseHash = hashLicenseKey(licenseKey);

  try {
    const existing = await getCreditRecord(licenseHash);
    if (existing) {
      const validation = await validateLemonLicense(licenseKey);
      if (!validation.valid) {
        response.status(403).json({ ok: false, message: "La licencia no está activa." });
        return;
      }

      const token = createSessionToken(licenseHash);
      response.status(200).json({
        ok: true,
        credits: Number(existing.remaining || 0),
        issuedCredits: Number(existing.issuedCredits || 0),
        token
      });
      return;
    }

    const validation = await validateLemonLicense(licenseKey);
    if (!validation.valid) {
      response.status(404).json({
        ok: false,
        message: "No encontramos esa license key. Revisá que esté escrita igual al correo de compra."
      });
      return;
    }

    let activation = null;
    try {
      activation = await activateLemonLicense(licenseKey);
    } catch {
      activation = validation;
    }

    const meta = licenseMeta(activation) || licenseMeta(validation);
    const issuedCredits = creditsForLicense(meta);
    const record = {
      licenseHash,
      licenseKeyId: meta.id || meta.license_key_id || "",
      status: meta.status || "",
      productId: String(meta.product_id || ""),
      productName: meta.product_name || "",
      variantId: String(meta.variant_id || ""),
      variantName: meta.variant_name || "",
      orderId: String(meta.order_id || ""),
      orderItemId: String(meta.order_item_id || ""),
      issuedCredits,
      remaining: issuedCredits,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await setCreditRecord(licenseHash, record);

    response.status(200).json({
      ok: true,
      credits: record.remaining,
      issuedCredits,
      token: createSessionToken(licenseHash)
    });
  } catch (error) {
    console.error(error);
    sendApiError(response, error);
  }
}
