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
- Descarga limpia usando créditos por código.
- Ruta `api/redeem.js` para validar códigos como secreto en Vercel.

## Cómo probar localmente

Abrí `index.html` en el navegador.

Para probar descarga limpia sin Vercel, usá uno de estos códigos demo:

- `DEMO-PRUEBAPDF-1`
- `DEMO-PRUEBAPDF-5`
- `DEMO-PRUEBAPDF-20`

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
    single: "https://gumroad.com/l/pruebapdf-individual",
    pack5: "https://gumroad.com/l/pruebapdf-pack-5",
    pack20: "https://gumroad.com/l/pruebapdf-pack-20"
  }
};
```

## Nota interna de precios

Los precios iniciales están en dólares: vista previa gratis, PDF individual a US$0.79, pack de 5 a US$2.99 y pack de 20 a US$8.99. Si el procesador de pagos cobra una comisión fija alta por transacción, conviene empujar más el pack de 20 como opción principal, porque mejora el margen por PDF y reduce el peso proporcional de esa comisión.

## Secreto de Vercel

En Vercel, agregá una variable de entorno llamada `PURCHASE_CODES`.

Formato:

```txt
CODIGO-UNO:1,CODIGO-PACK-5:5,CODIGO-PACK-20:20
```

No pegues esa variable en GitHub si contiene códigos reales.
