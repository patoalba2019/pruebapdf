# PruebaPDF

Microproducto para convertir capturas, chats, comprobantes, imágenes y PDFs en un PDF ordenado, numerado y fácil de compartir.

## Qué incluye

- Página principal con propuesta clara, usos, precios y preguntas frecuentes.
- Constructor de PDF en el navegador.
- Subida de JPG, PNG, WEBP y PDF.
- Orden manual con botones subir/bajar.
- Título, nombre, fecha, resumen y descripción por archivo.
- Índice, portada, línea temporal automática y numeración.
- Vista previa gratis con marca de agua.
- Descarga limpia usando créditos por license key de Lemon Squeezy.
- Rutas de Vercel para validar licencia, consultar saldo y descontar créditos en servidor.

## Cómo probar localmente

Abrí `index.html` en el navegador.

La descarga limpia requiere Vercel, Lemon Squeezy y almacenamiento KV configurados.

## Cómo cambiar precios y links

Editá `config.js`.

```js
window.PRUEBAPDF_CONFIG = {
  prices: {
    singleUsd: 0.79,
    pack5Usd: 2.99,
    pack20Usd: 8.99
  },
  paymentLinks: {
    single: "https://pruebapdf.lemonsqueezy.com/checkout/buy/b34f7e39-7702-43cd-8135-bff6fe578882",
    pack5: "https://pruebapdf.lemonsqueezy.com/checkout/buy/5e32fa30-3283-427c-84b0-d40791af6b58",
    pack20: "https://pruebapdf.lemonsqueezy.com/checkout/buy/d287a751-4ea7-4a9f-a998-a4976d94990f"
  }
};
```

## Nota interna de precios

Los precios iniciales están en dólares: vista previa gratis, PDF individual a US$0.79, pack de 5 a US$2.99 y pack de 20 a US$8.99. Si el procesador de pagos cobra una comisión fija alta por transacción, conviene empujar más el pack de 20 como opción principal, porque mejora el margen por PDF y reduce el peso proporcional de esa comisión.

## Pagos y créditos

El flujo principal usa Lemon Squeezy:

1. El usuario compra un producto con license keys activadas.
2. Lemon Squeezy le envía la license key por email.
3. El usuario ingresa la license key en PruebaPDF.
4. `api/redeem.js` valida la license key contra Lemon Squeezy.
5. Vercel KV guarda los créditos restantes del lado servidor.
6. `api/consume-credit.js` descuenta 1 crédito por cada descarga limpia.
7. `api/status.js` recupera el saldo si el usuario vuelve otro día.

Créditos por producto:

- PDF individual: 1 crédito.
- Pack de 5: 5 créditos.
- Pack de 20: 20 créditos.

El Pack de 20 está configurado como producto principal inicial.

## Variables de entorno de Vercel

No pongas claves reales en GitHub. Configuralas en Vercel, dentro del proyecto, en **Settings → Environment Variables**.

```txt
APP_SECRET=
LEMON_SQUEEZY_INDIVIDUAL_URL=https://pruebapdf.lemonsqueezy.com/checkout/buy/b34f7e39-7702-43cd-8135-bff6fe578882
LEMON_SQUEEZY_PACK5_URL=https://pruebapdf.lemonsqueezy.com/checkout/buy/5e32fa30-3283-427c-84b0-d40791af6b58
LEMON_SQUEEZY_PACK20_URL=https://pruebapdf.lemonsqueezy.com/checkout/buy/d287a751-4ea7-4a9f-a998-a4976d94990f
LEMON_SQUEEZY_API_KEY=
LEMON_SQUEEZY_STORE_ID=
LEMON_SQUEEZY_WEBHOOK_SECRET=
LEMON_SQUEEZY_INDIVIDUAL_PRODUCT_ID=
LEMON_SQUEEZY_INDIVIDUAL_VARIANT_ID=
LEMON_SQUEEZY_PACK5_PRODUCT_ID=1172786
LEMON_SQUEEZY_PACK5_VARIANT_ID=
LEMON_SQUEEZY_PACK20_PRODUCT_ID=1172401
LEMON_SQUEEZY_PACK20_VARIANT_ID=
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

`APP_SECRET` puede ser cualquier texto largo aleatorio. Se usa para firmar la sesión local del comprador sin exponer su license key.

## Almacenamiento gratuito

La opción más simple compatible con Vercel es **Vercel KV**. En Vercel, agregá Storage → KV al proyecto y Vercel crea automáticamente:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

Esas variables permiten guardar créditos restantes sin depender de `localStorage`.

## Datos de Lemon Squeezy

Para completar producción hacen falta:

- Store ID: en Lemon Squeezy → Settings → Stores.
- Product ID: aparece en la URL del producto. Los actuales son PDF individual `1172806`, Pack de 5 `1172786` y Pack de 20 `1172401`.
- Variant ID: se obtiene desde la variante del producto o por API.
- API key: Lemon Squeezy → Settings → API.
- Webhook secret: Lemon Squeezy → Settings → Webhooks, al crear el webhook.
- License key settings: Lemon Squeezy → Store → Products → PruebaPDF Pack de 20 → Settings → Generate license keys.

## Webhook

El sistema puede funcionar sin webhook porque los créditos se crean cuando el comprador ingresa su license key por primera vez. El webhook queda recomendado para una segunda etapa, por ejemplo para registrar compras apenas se completan.
