# CasoClaro

Microproducto para contar qué pasó, preparar mensajes claros y ordenar archivos si el usuario los tiene.

## Qué incluye

- Página principal con propuesta clara, usos, precios y preguntas frecuentes.
- Flujo guiado en 5 pasos: contar qué pasó, revisar lo detectado, sumar archivos opcionales, revisar el caso claro y elegir qué enviar o descargar.
- Camino completo sin archivos: WhatsApp, email, texto de formulario y documento simple.
- Biblioteca inteligente local para detectar subcasos comunes desde el relato del usuario.
- Motor local de hechos para detectar señales simples: fechas, importes, referencias, pagos, entregas, respuestas, demoras, trámites y alquileres.
- Ruta opcional `/api/analyze-case` para análisis inteligente con Cloudflare Workers AI del lado servidor, apagada por defecto si no hay variables configuradas.
- “Paquete armado” con cronología, hechos importantes, pruebas vinculadas, faltantes concretos y qué recibirá el usuario.
- Subida opcional de JPG, PNG, WEBP, PDF y TXT.
- Orden sugerido de archivos por rol probable, con opción manual mediante botones subir/bajar.
- Títulos limpios tipo “Archivo 1”, tipo de documento, fecha detectada y descripción editable.
- Textos sugeridos para resumen, asunto de email, email, WhatsApp, formulario y seguimiento.
- Índice, portada, resumen ejecutivo, relación hecho → prueba, línea temporal automática y numeración.
- Muestra protegida dentro de la web con marca de agua fuerte.
- Descarga limpia usando código de compra de Lemon Squeezy.
- Rutas de Vercel para validar licencia, consultar saldo y descontar créditos en servidor.

## Cómo probar localmente

Abrí `index.html` en el navegador.

La descarga limpia requiere Vercel, Lemon Squeezy y almacenamiento KV configurados. En local se puede probar el flujo visual; para probar créditos reales usá el despliegue de Vercel.

## Reglas de producto

- La muestra gratis se muestra dentro de la web y no descarga el documento completo limpio.
- La muestra incluye portada, resumen, índice y máximo 1 o 2 archivos completos cuando existen.
- El documento completo y el resumen descargable consumen 1 descarga disponible.
- No mostrar nombres técnicos de archivos, UUIDs o nombres internos en tarjetas, índice, PDF o muestra.
- Mantener siempre los links de compra, precios, license keys, redeem, status, consume-credit, webhooks y variables de entorno como zona protegida.

## Biblioteca inteligente de casos

La biblioteca está dentro de `app.js` en `caseLibrary`. Funciona localmente en el navegador y no guarda relatos privados en una base central.

Cada caso incluye:

- `id`: identificador interno.
- `caseTypeId`: tipo visual existente que reutiliza checklist y estructura.
- `requestType`: pedido sugerido.
- `keywords`: palabras simples en español e inglés para detectar el caso.
- `title`: título sugerido en español e inglés.
- `summary`: explicación breve de lo entendido.
- `canAsk`: opciones de pedido que puede hacer el usuario.
- `usefulFiles`: documentos o archivos que podrían servir.
- `missing`: dato simple que podría faltar.

Para agregar un caso nuevo:

1. Agregar una entrada nueva en `caseLibrary`.
2. Incluir keywords concretas, no genéricas.
3. Escribir textos completos en `es` y `en`.
4. Probar que no robe casos parecidos con frases reales.
5. Mantener la pregunta extra corta y accionable.

Casos implementados en serio:

- Compra online que no llegó.
- Producto defectuoso.
- Vendedor no responde.
- Devolución o garantía.
- Cobro incorrecto o cargo desconocido.
- Servicio no cumplido.
- Demora de envío.
- Pago duplicado.
- Suscripción no deseada.
- Trámite demorado.
- Problema de alquiler.

## Motor local de hechos y archivos

El motor funciona en el navegador, sin IA externa ni APIs pagas. Usa reglas simples sobre el relato, nombres de archivo y contenido de TXT.

Puede detectar con buena confiabilidad:

- Fechas escritas como `2026-06-20`, `20/06/2026` o similares.
- Importes escritos con `$`, `US$`, `USD`, `ARS`, pesos o dólares.
- Referencias simples como pedido, orden, reclamo, expediente, tracking o `#ABC123`.
- Señales de pago, entrega, respuesta, defecto, servicio pendiente, pago duplicado, suscripción, trámite y alquiler.
- Rol probable de archivos: comprobante, conversación, foto/captura, documento, seguimiento, contrato o constancia.

No promete:

- Entender perfectamente una foto.
- Leer PDFs escaneados.
- Interpretar chats complejos.
- Decidir quién tiene razón.
- Dar análisis legal.
- Inventar hechos que el usuario no indicó.
- Mensaje o documentación personal.

## Análisis inteligente opcional

La integración de IA está preparada con Cloudflare Workers AI, pero queda apagada por defecto. La app funciona con el motor local seguro aunque Cloudflare no esté configurado, no responda, supere la cuota o devuelva baja confianza.

Reglas de privacidad:

- La IA se ejecuta desde `/api/analyze-case`, del lado servidor.
- El token de Cloudflare nunca se envía al navegador.
- El usuario debe tocar “Analizar mi caso” antes de enviar información.
- No se envían archivos completos, fotos completas, PDFs completos, códigos de compra, datos de Lemon, créditos, claves ni variables de entorno.
- Se envía solo relato, idioma, nombres limpios de archivos, tipos, fechas/importes/referencias detectadas localmente y texto reducido de TXT o PDF seleccionable cuando exista.

Variables nuevas para Vercel:

```txt
AI_ANALYSIS_ENABLED=false
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_AI_TOKEN=
CLOUDFLARE_AI_MODEL=@cf/meta/llama-3.1-8b-instruct-fast
```

Para activar la capa inteligente:

1. Confirmar en Cloudflare que la cuenta está en plan gratuito y sin tarjeta obligatoria.
2. Crear un token de API con permisos mínimos para Workers AI.
3. Cargar las variables en Vercel.
4. Cambiar `AI_ANALYSIS_ENABLED` a `true`.

Si falta cualquier variable o `AI_ANALYSIS_ENABLED` no es `true`, la ruta responde como desactivada y la app usa el motor local.

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
AI_ANALYSIS_ENABLED=false
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_AI_TOKEN=
CLOUDFLARE_AI_MODEL=@cf/meta/llama-3.1-8b-instruct-fast
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
