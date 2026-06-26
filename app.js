const { PDFDocument, StandardFonts, degrees, rgb } = PDFLib;

const config = window.PRUEBAPDF_CONFIG || {};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const stepLabels = {
  es: ["Qué hacer", "Qué pasó", "Qué lograr", "Adjuntos", "Listo"],
  en: ["What to do", "What happened", "Goal", "Attachments", "Ready"]
};

const translations = {
  es: {
    heroEyebrow: "Asistente documental",
    heroTitle: "Convertí capturas, chats y comprobantes en un documento ordenado en minutos.",
    heroLead:
      "Contá qué pasó, prepará textos claros y ordená archivos si los tenés. CasoClaro te deja todo listo para copiar, enviar o guardar.",
    heroCta: "Crear documento",
    heroSecondary: "Ver cómo funciona",
    how1Title: "1. Elegí tu caso",
    how1Text: "La app propone estructura y checklist.",
    how2Title: "2. Cargá archivos",
    how2Text: "Títulos limpios y textos sugeridos.",
    how3Title: "3. Revisá y descargá",
    how3Text: "Así quedó y documento completo con código.",
    beforeAfterEyebrow: "Antes y después",
    beforeAfterTitle: "De archivos sueltos a un documento claro",
    beforeLabel: "Antes",
    before1: "Capturas sueltas",
    before2: "Chats dispersos",
    before3: "Comprobantes mezclados",
    afterLabel: "Después",
    after1: "Portada y resumen",
    after2: "Archivos ordenados",
    after3: "Índice y línea temporal",
    after4: "Mensajes listos para enviar",
    builderEyebrow: "Asistente simple",
    builderTitle: "Contá qué pasó. CasoClaro te ayuda con el resto.",
    builderLead: "Prepará un mensaje claro, un email, un texto para formulario y un documento simple. Podés adjuntar archivos si querés.",
    progressTitle: "Progreso",
    progressHelp: "Vamos de a un paso. Tu información se mantiene mientras avanzás.",
    step1Title: "¿Qué querés hacer hoy?",
    step1Lead: "Elegí una opción simple. Después contás qué pasó y CasoClaro te ayuda con el resto.",
    quickTitle: "Modo rápido",
    quickText: "Empezá con una base sugerida y cambiala si querés.",
    quickButton: "Empezar simple",
    chooseSituation: "Elegir tipo de situación",
    intentRequestTitle: "Preparar un reclamo o pedido",
    intentRequestText: "Te ayudamos a redactar qué decir y qué pedir.",
    intentOrganizeTitle: "Ordenar archivos y documentación",
    intentOrganizeText: "Subí lo que tengas y armamos un documento claro.",
    intentBothTitle: "Las dos cosas",
    intentBothText: "Preparamos tus textos y ordenamos tus archivos.",
    showMoreCases: "Ver más opciones",
    step2Title: "Contá qué pasó",
    step2Lead: "Escribí con tus palabras. Puede ser corto. Después podés agregar detalles si querés.",
    fieldStory: "¿Qué pasó?",
    storyPlaceholder: "Ejemplo: compré un producto, pagué, no llegó y quiero pedir una respuesta.",
    fieldRequest: "¿Qué necesitás pedir?",
    fieldTitle: "Título del caso",
    useExample: "Usar ejemplo",
    fieldSummary: "Resumen y pedido principal",
    fieldDate: "Fecha aproximada",
    fieldParty: "Empresa o persona",
    fieldReference: "Pedido o referencia",
    fieldName: "Tu nombre",
    fieldStatus: "Estado actual",
    fieldAttempt: "¿Qué ya intentaste hacer?",
    attemptPlaceholder: "Ejemplo: escribí por WhatsApp, mandé email o hice un reclamo",
    toneTitle: "Estilo del texto",
    advancedBasic: "Agregar más detalles",
    step3Title: "¿Qué querés lograr?",
    step3Lead: "Elegí el pedido principal. Si no estás seguro, dejá “Una solución”.",
    step4Title: "¿Tenés algo para adjuntar?",
    step4Lead: "No necesitás archivos para empezar. Podés preparar tu mensaje ahora y sumar documentos después si querés.",
    attachmentUploadTitle: "Subir fotos o documentos",
    attachmentUploadText: "Agregá capturas, PDFs, TXT o comprobantes.",
    attachmentNoneTitle: "No tengo archivos ahora",
    attachmentNoneText: "Seguís igual: armamos tus textos y documento simple.",
    attachmentMessageTitle: "Solo quiero preparar mi mensaje",
    attachmentMessageText: "Ideal si necesitás copiar y enviar rápido.",
    attachmentLaterTitle: "Agregar después",
    attachmentLaterText: "Podés avanzar y volver a subir documentos cuando quieras.",
    uploadTitle: "Subí archivos si querés",
    uploadText: "Tocá para elegir archivos, arrastralos acá o continuá sin adjuntar.",
    advancedFiles: "Orden y documentos",
    sortManual: "Mantener mi orden",
    sortDate: "Ordenar por fecha",
    sortType: "Ordenar por tipo",
    step5Title: "Listo, esto preparamos para vos",
    step5Lead: "Ya tenés qué decir, qué enviar y qué guardar. Podés copiar textos gratis o desbloquear la descarga limpia.",
    editPreparedTexts: "Editar textos preparados",
    step6Title: "Listo para enviar",
    step6Lead: "Copiá el mensaje que necesitás o seguí a descarga cuando quieras.",
    step7Title: "Descarga y compra",
    step7Lead: "Elegí si ya tenés código o querés comprar una descarga o pack.",
    unlockCodeTitle: "Ya tengo código",
    buyTitle: "Comprar una descarga o pack",
    buyLead: "Se abre una página segura de pago. Después volvés y pegás tu código.",
    buySingle: "1 documento completo",
    buyPack5: "5 documentos completos",
    buyPack20: "20 documentos completos",
    bestPrice: "Mejor precio por documento",
    back: "Volver",
    next: "Continuar",
    pricesEyebrow: "Precios",
    pricesTitle: "Elegí cómo desbloquear tus documentos",
    pricesNote: "Cada documento puede incluir varias páginas, imágenes, comprobantes, textos y descripciones.",
    freeBadge: "Así quedó protegido",
    freeTitle: "Gratis",
    freeText: "Revisá cómo quedará tu documento.",
    freeAction: "Ver así quedó",
    singleBadge: "1 documento completo",
    singleTitle: "Individual",
    singleText: "Para un caso puntual.",
    singleAction: "Comprar individual",
    pack5Badge: "5 documentos completos",
    pack5Title: "Pack de 5",
    pack5Text: "Para varios reclamos o trámites.",
    packAction: "Comprar pack",
    recommended: "Más conveniente",
    pack20Badge: "20 documentos completos",
    pack20Title: "Pack de 20",
    pack20Text: "Mejor precio por documento.",
    pack20Action: "Comprar mejor precio",
    faqTitle: "Preguntas frecuentes",
    faq1Q: "¿Qué incluye un documento completo?",
    faq1A: "Portada, resumen, pedido principal, textos listos, archivos cargados y línea temporal cuando hay fechas.",
    faq2Q: "¿Qué puedo subir?",
    faq2A: "Fotos, capturas, comprobantes, PDF y TXT. Cada archivo se convierte en un documento ordenado.",
    faq3Q: "¿Cómo uso un pack?",
    faq3A: "Comprás en Lemon Squeezy, recibís un código por email y lo pegás para habilitar tus descargas.",
    progressStep: "Paso",
    downloadsAvailable: "Descargas disponibles",
    pastePurchaseCode: "Pegá tu código de compra.",
    pasteEmailCode: "Pegá el código que recibiste por email para ver tus descargas disponibles.",
    evidence: "Archivo",
    document: "Documento",
    cleanTitle: "Título simple",
    shortDescription: "Descripción breve",
    editTypeDate: "Editar tipo o fecha",
    addedToMap: "Agregado al mapa del caso",
    tapIfHave: "Tocá si ya lo tenés",
    noFilesEmpty: "No necesitás archivos para empezar. Podés preparar tu mensaje ahora y sumar documentos después si querés.",
    caseMap1: "Qué pasó",
    caseMap2: "Pedido principal",
    caseMap3: "Ya tenés",
    caseMap4: "Podrías sumar",
    filesAdded: "archivo(s)",
    readyMarked: "dato(s) marcados como listos.",
    optional: "Opcional",
    complete: "Completo",
    baseReady: "La base principal ya está armada.",
    pagesApprox: "páginas aprox.",
    resultReady: "Texto listo, documento completo y resumen preparados.",
    requestResponse: "Una respuesta",
    requestSolution: "Una solución",
    requestExchange: "Un cambio",
    requestRefund: "Una devolución",
    requestReview: "Una revisión",
    requestRecord: "Dejar constancia",
    requestOther: "Otro pedido",
    requestResponsePhrase: "una respuesta clara",
    requestSolutionPhrase: "una solución para la situación planteada",
    requestExchangePhrase: "un cambio o reemplazo, si corresponde",
    requestRefundPhrase: "la devolución del importe abonado, si corresponde",
    requestReviewPhrase: "una revisión de la situación",
    requestRecordPhrase: "dejar constancia de la situación y recibir confirmación",
    requestOtherPhrase: "una respuesta sobre el pedido indicado",
    whatsappReadyLabel: "Texto breve para WhatsApp",
    emailReadyLabel: "Texto formal para email",
    formReadyLabel: "Texto para formulario",
    clearCaseTitle: "Tu caso en claro",
    clearCaseHelp: "Este resumen se arma con lo que contaste y lo que cargaste.",
    understoodTitle: "Esto entendimos de tu situación",
    requestTitle: "Esto es lo que querés pedir",
    alreadyHaveTitle: "Lo que ya tenés",
    couldAddTitle: "Lo que podrías sumar si lo tenés",
    nextStepsTitle: "Próximos pasos simples",
    nextStepReview: "Revisá que el mensaje diga lo que querés.",
    nextStepPreview: "Mirá cómo quedó con marca de agua.",
    nextStepSend: "Copiá el texto o descargá el respaldo cuando esté desbloqueado.",
    readySendTitle: "Listo para enviar",
    readySendLead: "Tres salidas simples: mensaje corto, texto formal y documento de respaldo.",
    whatsappBlockTitle: "Mensaje para WhatsApp",
    emailBlockTitle: "Email o texto formal",
    documentBlockTitle: "Documento simple + resumen",
    documentBlockText: "Incluye portada, pedido principal, texto listo, archivos si los agregaste y un resumen corto.",
    documentNoFilesText: "No necesitás archivos para empezar. Incluye portada, pedido principal, texto listo y resumen corto. Podés sumar documentos después si querés.",
    messageOnlyDocument: "Documento simple sin archivos adjuntos",
    copyWhatsApp: "Copiar WhatsApp",
    copyEmail: "Copiar email",
    copyForm: "Usar en formulario",
    goToUnlock: "Ir a descarga o compra",
    openEmailAction: "Abrir email",
    openWhatsAppAction: "Abrir WhatsApp",
    readyToSend: "Texto listo para enviar",
    mainRequestLabel: "Pedido principal",
    whatCouldHelp: "Podrías sumar",
    noMissingNeeded: "Con lo que cargaste ya hay una base clara para revisar.",
    missingDate: "Agregar una fecha puede ayudar a ordenar la situación.",
    missingReference: "Sumar un número de pedido, reclamo o referencia puede hacerlo más fácil de ubicar.",
    missingEvidence: "Si más adelante tenés archivos, podés sumarlos.",
    missingAttempt: "Contar qué ya intentaste ayuda a explicar el recorrido.",
    generatedFromYourInfo: "Texto generado con tu información. Podés editarlo antes de copiar o descargar.",
    finalTitle: "Esto es lo que preparaste",
    filesAddedMetric: "archivos agregados",
    estimatedPages: "páginas estimadas",
    markedData: "datos marcados",
    fullDocumentLabel: "Documento completo:",
    fullDocumentIncludes: "portada, resumen y pedido principal, texto listo, archivos si los agregaste y línea temporal si hay fechas.",
    summaryLabel: "Resumen:",
    summaryIncludes: "una versión corta para enviar rápido por email, WhatsApp o formulario.",
    previewReadyInside: "Así quedó listo dentro de la web",
    uploadAtLeastOnePreview: "Podés ver cómo queda aunque no tengas archivos.",
    uploadAtLeastOneDoc: "Podés descargar un documento simple aunque no tengas archivos.",
    unsupportedFiles: "Algunos archivos no se agregaron. Usá fotos, capturas, PDF o TXT de hasta 25 MB.",
    previewWatermark: "MUESTRA PROTEGIDA",
    indexTitle: "Índice",
    fullOnly: "Disponible en el documento completo",
    previewReadyMessage: "Así quedó listo. Para descargar limpio, usá un código de compra.",
    timeline: "Línea temporal",
    readyTextEyebrow: "Textos listos",
    shareTitle: "Copiá y enviá sin pensar de más",
    emailSubject: "Asunto de email",
    formText: "Texto para formulario",
    copy: "Copiar",
    openWhatsApp: "Abrir WhatsApp",
    openEmail: "Abrir email",
    copied: "Texto copiado.",
    hello: "Hola,",
    shareEmailIntro: "Comparto documentación organizada sobre:",
    reference: "Referencia:",
    emailAttachment: "Adjunto el documento con resumen y archivos ordenados.",
    thanks: "Gracias.",
    whatsappIntro: "Hola, te comparto la documentación organizada sobre",
    whatsappIncludes: "Incluye resumen y archivos ordenados para revisar rápido.",
    formCase: "Caso",
    formSummary: "Resumen",
    formEvidenceCount: "Archivos incluidos",
    validatingCode: "Validando código...",
    enterPurchaseCode: "Ingresá tu código de compra.",
    codeValidated: "Código validado. Tenés",
    downloadsUnit: "descarga(s).",
    cannotValidate: "No pudimos validar el código.",
    validationOffline: "No pudimos conectar con la validación online. Probá de nuevo en unos minutos.",
    enableDownloads: "Ingresá tu código para habilitar descargas.",
    preparingDocs: "Preparando documento completo y resumen...",
    cannotDiscount: "No pudimos descontar una descarga.",
    doneRemaining: "Listo. Te quedan",
    cannotGenerate: "No pudimos generar el documento. Probá con archivos más livianos.",
    fastReady: "Listo. Ahora contá qué pasó con tus palabras.",
    organizedDocument: "Documento organizado",
    caseTypeLabel: "Tipo de caso",
    dateLabel: "Fecha",
    relatedPartyLabel: "Parte relacionada",
    preparedByLabel: "Preparado por",
    executiveSummary: "Resumen ejecutivo",
    caseSummaryPdf: "Resumen y pedido principal",
    evidenceIndexPdf: "Índice de archivos",
    iHaveIt: "Lo tengo",
    addLater: "Lo agregaré después",
    attachedPdf: "PDF adjunto en las páginas siguientes",
    attachedText: "Texto adjunto",
    page: "Página",
    checklist: "Checklist",
    email: "Email",
    whatsapp: "WhatsApp",
    uploadEvidence: "Subir archivo",
    moveEvidenceDown: "Bajar archivo",
    deleteEvidence: "Eliminar archivo",
    receipt: "Comprobante",
    payment: "Pago",
    conversation: "Conversación",
    photo: "Foto",
    status: "Estado",
    note: "Nota",
    datePrefix: "Fecha",
    freePrice: "Gratis",
    previewButton: "Ver así quedó",
    redeemButton: "Validar",
    cleanButton: "Descargar documento completo y resumen",
    purchaseCodePlaceholder: "Código de compra",
    partyPlaceholder: "Ejemplo: tienda, vendedor o empresa",
    referencePlaceholder: "Ejemplo: número de pedido",
    optionalPlaceholder: "Opcional",
    heroMess1: "Captura del chat",
    heroMess2: "Comprobante de pago",
    heroMess3: "Detalle del pedido",
    heroDocTitle: "Documento claro",
    heroDocCase: "Compra online",
    heroDocCover: "Portada",
    heroDocSummary: "Resumen del caso",
    heroDocEvidence: "Archivos ordenados",
    heroDocTimeline: "Línea temporal",
    seoEyebrow: "Casos de uso",
    seoTitle: "Organización para reclamos, garantías, alquileres y trámites",
    seo1Title: "Organizar capturas para reclamo",
    seo1Text: "Reuní conversaciones, comprobantes, fotos y referencias en un documento ordenado.",
    seo2Title: "Documento para compra online",
    seo2Text: "Armá un resumen claro con publicación, pago, pedido, chats y estado del producto.",
    seo3Title: "Documento para garantía",
    seo3Text: "Presentá factura, fecha de compra, imágenes del inconveniente y comunicaciones de soporte.",
    seo4Title: "Organize screenshots into PDF",
    seo4Text: "Create a clean document from screenshots, chats, receipts and supporting files.",
    footerText: "Servicio de organización documental.",
    terms: "Términos",
    privacy: "Privacidad"
  },
  en: {
    heroEyebrow: "Document assistant",
    heroTitle: "Turn screenshots, chats and receipts into an organized document in minutes.",
    heroLead:
      "Tell what happened, prepare clear text and organize files if you have them. CasoClaro gets everything ready to copy, send or keep.",
    heroCta: "Create document",
    heroSecondary: "See how it works",
    how1Title: "1. Choose your case",
    how1Text: "The app suggests structure and checklist.",
    how2Title: "2. Upload files",
    how2Text: "Clean titles and suggested text.",
    how3Title: "3. Review and download",
    how3Text: "How it looks and full document with code.",
    beforeAfterEyebrow: "Before and after",
    beforeAfterTitle: "From scattered files to a clear document",
    beforeLabel: "Before",
    before1: "Loose screenshots",
    before2: "Scattered chats",
    before3: "Mixed receipts",
    afterLabel: "After",
    after1: "Cover and summary",
    after2: "Organized files",
    after3: "Index and timeline",
    after4: "Messages ready to send",
    builderEyebrow: "Simple assistant",
    builderTitle: "Tell what happened. CasoClaro helps with the rest.",
    builderLead: "Prepare a clear message, an email, form text and a simple document. You can attach files if you want.",
    progressTitle: "Progress",
    progressHelp: "One step at a time. Your information stays while you move forward.",
    step1Title: "What do you want to do today?",
    step1Lead: "Choose one simple option. Then tell what happened and CasoClaro helps with the rest.",
    quickTitle: "Quick mode",
    quickText: "Start with a suggested base and change it if you want.",
    quickButton: "Start simple",
    chooseSituation: "Choose situation type",
    intentRequestTitle: "Prepare a claim or request",
    intentRequestText: "We help you write what to say and what to ask for.",
    intentOrganizeTitle: "Organize files and documents",
    intentOrganizeText: "Upload what you have and we prepare a clear document.",
    intentBothTitle: "Both",
    intentBothText: "We prepare your text and organize your files.",
    showMoreCases: "Show more options",
    step2Title: "Tell what happened",
    step2Lead: "Write it in your own words. It can be short. You can add more details later if you want.",
    fieldStory: "What happened?",
    storyPlaceholder: "Example: I bought a product, paid, it did not arrive and I want to ask for a response.",
    fieldRequest: "What do you need to ask for?",
    fieldTitle: "Case title",
    useExample: "Use example",
    fieldSummary: "Summary and main request",
    fieldDate: "Approximate date",
    fieldParty: "Company or person",
    fieldReference: "Order or reference",
    fieldName: "Your name",
    fieldStatus: "Current status",
    fieldAttempt: "What have you already tried?",
    attemptPlaceholder: "Example: I wrote through WhatsApp, sent an email or opened a request",
    toneTitle: "Text style",
    advancedBasic: "Add more details",
    step3Title: "What do you want to achieve?",
    step3Lead: "Choose the main request. If you are not sure, leave “A solution”.",
    step4Title: "Do you have anything to attach?",
    step4Lead: "You do not need files to start. You can prepare your message now and add documents later if you want.",
    attachmentUploadTitle: "Upload photos or documents",
    attachmentUploadText: "Add screenshots, PDFs, TXT files or receipts.",
    attachmentNoneTitle: "I do not have files now",
    attachmentNoneText: "You can continue: we prepare your text and simple document.",
    attachmentMessageTitle: "I only want to prepare my message",
    attachmentMessageText: "Ideal if you need to copy and send quickly.",
    attachmentLaterTitle: "Add later",
    attachmentLaterText: "You can move forward and come back to upload documents.",
    uploadTitle: "Upload files if you want",
    uploadText: "Tap to choose files, drag them here or continue without attaching.",
    advancedFiles: "Order and documents",
    sortManual: "Keep my order",
    sortDate: "Sort by date",
    sortType: "Sort by type",
    step5Title: "Done, this is what we prepared for you",
    step5Lead: "You now have what to say, what to send and what to keep. You can copy text for free or unlock the clean download.",
    editPreparedTexts: "Edit prepared text",
    step6Title: "Ready to send",
    step6Lead: "Copy the message you need or continue to download when you are ready.",
    step7Title: "Download and purchase",
    step7Lead: "Choose whether you already have a code or want to buy one download or a pack.",
    unlockCodeTitle: "I already have a code",
    buyTitle: "Buy a download or pack",
    buyLead: "A secure payment page opens. Then come back and paste your code.",
    buySingle: "1 full document",
    buyPack5: "5 full documents",
    buyPack20: "20 full documents",
    bestPrice: "Best price per document",
    back: "Back",
    next: "Continue",
    pricesEyebrow: "Pricing",
    pricesTitle: "Choose how to unlock your documents",
    pricesNote: "Each document can include multiple pages, images, receipts, text and descriptions.",
    freeBadge: "Protected sample",
    freeTitle: "Free",
    freeText: "Review how your document will look.",
    freeAction: "See how it looks",
    singleBadge: "1 full document",
    singleTitle: "Individual",
    singleText: "For one specific case.",
    singleAction: "Buy individual",
    pack5Badge: "5 full documents",
    pack5Title: "Pack of 5",
    pack5Text: "For several claims or procedures.",
    packAction: "Buy pack",
    recommended: "Best value",
    pack20Badge: "20 full documents",
    pack20Title: "Pack of 20",
    pack20Text: "Best price per document.",
    pack20Action: "Buy best value",
    faqTitle: "FAQ",
    faq1Q: "What does a full document include?",
    faq1A: "Cover, summary, main request, ready text, uploaded files and timeline when dates are available.",
    faq2Q: "What can I upload?",
    faq2A: "Photos, screenshots, receipts, PDF and TXT files. Each file becomes an organized document item.",
    faq3Q: "How do I use a pack?",
    faq3A: "Buy through Lemon Squeezy, receive a code by email and paste it to enable your downloads.",
    progressStep: "Step",
    downloadsAvailable: "Downloads available",
    pastePurchaseCode: "Paste your purchase code.",
    pasteEmailCode: "Paste the code you received by email to see your available downloads.",
    evidence: "File",
    document: "Document",
    cleanTitle: "Simple title",
    shortDescription: "Short description",
    editTypeDate: "Edit type or date",
    addedToMap: "Added to the case map",
    tapIfHave: "Tap if you have it",
    noFilesEmpty: "You do not need files to start. You can prepare your message now and add documents later if you want.",
    caseMap1: "What happened",
    caseMap2: "Main request",
    caseMap3: "You have",
    caseMap4: "You could add",
    filesAdded: "file(s)",
    readyMarked: "item(s) marked as ready.",
    optional: "Optional",
    complete: "Complete",
    baseReady: "The main base is already prepared.",
    pagesApprox: "approx. pages",
    resultReady: "Ready-to-send text, full document and summary prepared.",
    requestResponse: "A response",
    requestSolution: "A solution",
    requestExchange: "An exchange",
    requestRefund: "A refund",
    requestReview: "A review",
    requestRecord: "Leave a record",
    requestOther: "Another request",
    requestResponsePhrase: "a clear response",
    requestSolutionPhrase: "a solution for the situation described",
    requestExchangePhrase: "an exchange or replacement, if applicable",
    requestRefundPhrase: "a refund of the amount paid, if applicable",
    requestReviewPhrase: "a review of the situation",
    requestRecordPhrase: "to leave a record of the situation and receive confirmation",
    requestOtherPhrase: "a response about the request described",
    whatsappReadyLabel: "Short WhatsApp text",
    emailReadyLabel: "Formal email text",
    formReadyLabel: "Text for a form",
    clearCaseTitle: "Your clear case",
    clearCaseHelp: "This summary is built from what you wrote and uploaded.",
    understoodTitle: "This is what we understood",
    requestTitle: "This is what you want to ask for",
    alreadyHaveTitle: "What you already have",
    couldAddTitle: "What you could add if you have it",
    nextStepsTitle: "Simple next steps",
    nextStepReview: "Check that the message says what you want.",
    nextStepPreview: "Review how it looks with a watermark.",
    nextStepSend: "Copy the text or download the backup when it is unlocked.",
    readySendTitle: "Ready to send",
    readySendLead: "Three simple outputs: short message, formal text and backup document.",
    whatsappBlockTitle: "WhatsApp message",
    emailBlockTitle: "Email or formal text",
    documentBlockTitle: "Simple document + summary",
    documentBlockText: "Includes cover, main request, ready text, files if you added them and a short summary.",
    documentNoFilesText: "You do not need files to start. It includes cover, main request, ready text and a short summary. You can add documents later if you want.",
    messageOnlyDocument: "Simple document without attached files",
    copyWhatsApp: "Copy WhatsApp",
    copyEmail: "Copy email",
    copyForm: "Use in form",
    goToUnlock: "Go to download or purchase",
    openEmailAction: "Open email",
    openWhatsAppAction: "Open WhatsApp",
    readyToSend: "Ready-to-send text",
    mainRequestLabel: "Main request",
    whatCouldHelp: "You could add",
    noMissingNeeded: "What you added is enough to provide a clear starting point.",
    missingDate: "Adding a date can help organize the situation.",
    missingReference: "Adding an order, request or reference number can make it easier to identify.",
    missingEvidence: "If you have files later, you can add them.",
    missingAttempt: "Explaining what you already tried helps show the steps taken.",
    generatedFromYourInfo: "Text generated from your information. You can edit it before copying or downloading.",
    finalTitle: "This is what you prepared",
    filesAddedMetric: "files added",
    estimatedPages: "estimated pages",
    markedData: "marked items",
    fullDocumentLabel: "Full document:",
    fullDocumentIncludes: "cover, summary and main request, ready text, files if you added them and timeline if dates are available.",
    summaryLabel: "Summary:",
    summaryIncludes: "a short version to quickly send by email, WhatsApp or form.",
    previewReadyInside: "This is ready inside the website",
    uploadAtLeastOnePreview: "You can see how it looks even without files.",
    uploadAtLeastOneDoc: "You can download a simple document even without files.",
    unsupportedFiles: "Some files were not added. Use photos, screenshots, PDF or TXT files up to 25 MB.",
    previewWatermark: "PROTECTED SAMPLE",
    indexTitle: "Index",
    fullOnly: "Available in the full document",
    previewReadyMessage: "This is ready. To download it clean, use a purchase code.",
    timeline: "Timeline",
    readyTextEyebrow: "Ready text",
    shareTitle: "Copy and send without overthinking",
    emailSubject: "Email subject",
    formText: "Form text",
    copy: "Copy",
    openWhatsApp: "Open WhatsApp",
    openEmail: "Open email",
    copied: "Text copied.",
    hello: "Hi,",
    shareEmailIntro: "I am sharing organized documentation about:",
    reference: "Reference:",
    emailAttachment: "I attached the document with the summary and organized files.",
    thanks: "Thanks.",
    whatsappIntro: "Hi, I am sharing the organized documentation about",
    whatsappIncludes: "It includes a summary and organized files for quick review.",
    formCase: "Case",
    formSummary: "Summary",
    formEvidenceCount: "Files included",
    validatingCode: "Validating code...",
    enterPurchaseCode: "Enter your purchase code.",
    codeValidated: "Code validated. You have",
    downloadsUnit: "download(s).",
    cannotValidate: "We could not validate the code.",
    validationOffline: "We could not connect to online validation. Try again in a few minutes.",
    enableDownloads: "Enter your code to enable downloads.",
    preparingDocs: "Preparing full document and summary...",
    cannotDiscount: "We could not subtract a download.",
    doneRemaining: "Done. You have",
    cannotGenerate: "We could not generate the document. Try lighter files.",
    fastReady: "Ready. Now tell what happened in your own words.",
    organizedDocument: "Organized document",
    caseTypeLabel: "Case type",
    dateLabel: "Date",
    relatedPartyLabel: "Related party",
    preparedByLabel: "Prepared by",
    executiveSummary: "Executive summary",
    caseSummaryPdf: "Summary and main request",
    evidenceIndexPdf: "File index",
    iHaveIt: "I have it",
    addLater: "I will add it later",
    attachedPdf: "Attached PDF on the following pages",
    attachedText: "Attached text",
    page: "Page",
    checklist: "Checklist",
    email: "Email",
    whatsapp: "WhatsApp",
    uploadEvidence: "Move file up",
    moveEvidenceDown: "Move file down",
    deleteEvidence: "Delete file",
    receipt: "Receipt",
    payment: "Payment",
    conversation: "Conversation",
    photo: "Photo",
    status: "Status",
    note: "Note",
    datePrefix: "Date",
    freePrice: "Free",
    previewButton: "See how it looks",
    redeemButton: "Validate",
    cleanButton: "Download full document and summary",
    purchaseCodePlaceholder: "Purchase code",
    partyPlaceholder: "Example: store, seller or company",
    referencePlaceholder: "Example: order number",
    optionalPlaceholder: "Optional",
    heroMess1: "Chat screenshot",
    heroMess2: "Payment receipt",
    heroMess3: "Order details",
    heroDocTitle: "Clear document",
    heroDocCase: "Online purchase",
    heroDocCover: "Cover",
    heroDocSummary: "Case summary",
    heroDocEvidence: "Organized files",
    heroDocTimeline: "Timeline",
    seoEyebrow: "Use cases",
    seoTitle: "Organize claims, warranties, rentals and personal procedures",
    seo1Title: "Organize screenshots for a claim",
    seo1Text: "Gather conversations, receipts, photos and references in an organized document.",
    seo2Title: "Document for an online purchase",
    seo2Text: "Create a clear summary with listing, payment, order, chats and product status.",
    seo3Title: "Document for a warranty",
    seo3Text: "Present invoice, purchase date, issue images and support communications.",
    seo4Title: "Organize screenshots into PDF",
    seo4Text: "Create a clean document from screenshots, chats, receipts and supporting files.",
    footerText: "Document organization service.",
    terms: "Terms",
    privacy: "Privacy"
  }
};

const caseTypes = [
  {
    id: "online",
    icon: "🛒",
    title: "Compra online",
    description: "Pedido, pago, chats y estado del envío.",
    exampleTitle: "Reclamo por compra online",
    summary:
      "Compré un producto online y quiero ordenar la información principal: publicación, comprobante de pago, conversaciones y estado actual del pedido.",
    checklist: ["Publicación o descripción del producto", "Comprobante de pago", "Número de pedido", "Chat con el vendedor", "Estado del envío", "Fotos del producto"],
    evidence: ["Publicación del producto", "Comprobante de pago", "Conversación con el vendedor", "Estado del envío"],
    en: {
      title: "Online purchase",
      description: "Order, payment, chats and delivery status.",
      exampleTitle: "Online purchase claim",
      summary:
        "I bought a product online and want to organize the main information: listing, payment receipt, conversations and current order status.",
      checklist: ["Product listing or description", "Payment receipt", "Order number", "Chat with the seller", "Delivery status", "Product photos"],
      evidence: ["Product listing", "Payment receipt", "Conversation with the seller", "Delivery status"]
    }
  },
  {
    id: "warranty",
    icon: "🧾",
    title: "Garantía",
    description: "Factura, fecha de compra y soporte.",
    exampleTitle: "Solicitud de garantía",
    summary:
      "Quiero ordenar los datos de compra, comprobantes y comunicaciones relacionadas con una solicitud de garantía.",
    checklist: ["Factura o ticket", "Fecha de compra", "Fotos del inconveniente", "Manual o condiciones", "Chat o email de soporte"],
    evidence: ["Factura de compra", "Foto del inconveniente", "Mensaje a soporte", "Respuesta recibida"],
    en: {
      title: "Warranty",
      description: "Invoice, purchase date and support.",
      exampleTitle: "Warranty request",
      summary: "I want to organize purchase details, receipts and communications related to a warranty request.",
      checklist: ["Invoice or receipt", "Purchase date", "Photos of the issue", "Manual or terms", "Support chat or email"],
      evidence: ["Purchase invoice", "Photo of the issue", "Message to support", "Response received"]
    }
  },
  {
    id: "defect",
    icon: "🔧",
    title: "Producto defectuoso",
    description: "Fotos, falla y comunicaciones.",
    exampleTitle: "Producto recibido con inconveniente",
    summary:
      "Recibí o tengo un producto con un inconveniente y quiero presentar la información en orden, con fotos y mensajes asociados.",
    checklist: ["Fotos del producto", "Descripción del inconveniente", "Comprobante de compra", "Mensajes enviados", "Respuesta recibida"],
    evidence: ["Foto general del producto", "Detalle del inconveniente", "Comprobante de compra", "Comunicación enviada"],
    en: {
      title: "Defective product",
      description: "Photos, issue and communications.",
      exampleTitle: "Product received with an issue",
      summary: "I received or have a product with an issue and want to present the information in order, with related photos and messages.",
      checklist: ["Product photos", "Issue description", "Purchase receipt", "Messages sent", "Response received"],
      evidence: ["General product photo", "Issue detail", "Purchase receipt", "Message sent"]
    }
  },
  {
    id: "service",
    icon: "📋",
    title: "Servicio no cumplido",
    description: "Contrato, pagos y mensajes.",
    exampleTitle: "Seguimiento de servicio contratado",
    summary:
      "Contraté un servicio y quiero ordenar pagos, acuerdos, fechas y conversaciones para explicar el estado del caso.",
    checklist: ["Presupuesto o acuerdo", "Comprobante de pago", "Fecha pactada", "Mensajes", "Resultado actual"],
    evidence: ["Acuerdo del servicio", "Pago realizado", "Mensaje de seguimiento", "Estado actual"],
    en: {
      title: "Service not completed",
      description: "Agreement, payments and messages.",
      exampleTitle: "Service follow-up",
      summary: "I hired a service and want to organize payments, agreements, dates and conversations to explain the current status.",
      checklist: ["Quote or agreement", "Payment receipt", "Agreed date", "Messages", "Current result"],
      evidence: ["Service agreement", "Payment made", "Follow-up message", "Current status"]
    }
  },
  {
    id: "seller",
    icon: "🤝",
    title: "Vendedor particular",
    description: "Acuerdo, pago y entrega.",
    exampleTitle: "Operación con vendedor particular",
    summary:
      "Quiero dejar ordenada una operación con una persona particular, incluyendo acuerdo, pago, mensajes y entrega.",
    checklist: ["Publicación o acuerdo", "Datos de contacto", "Pago o transferencia", "Mensajes", "Entrega o retiro"],
    evidence: ["Acuerdo inicial", "Comprobante de transferencia", "Chat principal", "Estado de entrega"],
    en: {
      title: "Private seller",
      description: "Agreement, payment and delivery.",
      exampleTitle: "Deal with a private seller",
      summary: "I want to organize a deal with a private person, including agreement, payment, messages and delivery.",
      checklist: ["Listing or agreement", "Contact details", "Payment or transfer", "Messages", "Delivery or pickup"],
      evidence: ["Initial agreement", "Transfer receipt", "Main chat", "Delivery status"]
    }
  },
  {
    id: "rent",
    icon: "🏠",
    title: "Alquiler",
    description: "Pagos, contrato, fotos y reclamos.",
    exampleTitle: "Documentación de alquiler",
    summary:
      "Necesito organizar documentos, pagos, fotos y comunicaciones relacionadas con un alquiler.",
    checklist: ["Contrato", "Recibos o transferencias", "Fotos", "Mensajes", "Fechas importantes"],
    evidence: ["Contrato o acuerdo", "Pago registrado", "Foto del estado", "Mensaje relevante"],
    en: {
      title: "Rental",
      description: "Payments, contract, photos and claims.",
      exampleTitle: "Rental documentation",
      summary: "I need to organize documents, payments, photos and communications related to a rental.",
      checklist: ["Contract", "Receipts or transfers", "Photos", "Messages", "Important dates"],
      evidence: ["Contract or agreement", "Recorded payment", "Condition photo", "Relevant message"]
    }
  },
  {
    id: "chargeback",
    icon: "💳",
    title: "Contracargo",
    description: "Pago, pedido y soporte.",
    exampleTitle: "Documentación para contracargo",
    summary:
      "Quiero reunir la información de pago, pedido y comunicaciones para presentar un caso de contracargo.",
    checklist: ["Comprobante de tarjeta o pago", "Detalle del pedido", "Mensajes", "Intentos de solución", "Resultado actual"],
    evidence: ["Pago realizado", "Detalle del pedido", "Mensaje al comercio", "Respuesta recibida"],
    en: {
      title: "Chargeback",
      description: "Payment, order and support.",
      exampleTitle: "Chargeback documentation",
      summary: "I want to gather payment, order and communication information to present a chargeback case.",
      checklist: ["Card or payment receipt", "Order details", "Messages", "Resolution attempts", "Current result"],
      evidence: ["Payment made", "Order details", "Message to the store", "Response received"]
    }
  },
  {
    id: "personal",
    icon: "📁",
    title: "Trámite personal",
    description: "Archivos, fechas y resumen.",
    exampleTitle: "Documentación para trámite",
    summary:
      "Quiero ordenar archivos, fechas y observaciones para presentar un trámite de forma clara.",
    checklist: ["Documento principal", "Comprobante", "Formulario", "Mensajes", "Fecha de presentación"],
    evidence: ["Documento principal", "Comprobante adjunto", "Formulario", "Mensaje relevante"],
    en: {
      title: "Personal procedure",
      description: "Files, dates and summary.",
      exampleTitle: "Procedure documentation",
      summary: "I want to organize files, dates and notes to present a procedure clearly.",
      checklist: ["Main document", "Receipt", "Form", "Messages", "Submission date"],
      evidence: ["Main document", "Attached receipt", "Form", "Relevant message"]
    }
  },
  {
    id: "other",
    icon: "✨",
    title: "Otro",
    description: "Estructura simple y flexible.",
    exampleTitle: "Documento organizado",
    summary:
      "Quiero ordenar capturas, comprobantes y documentos en una presentación clara, fácil de revisar y compartir.",
    checklist: ["Archivo principal", "Comprobante", "Mensajes", "Fotos", "Notas del caso"],
    evidence: ["Archivo principal", "Comprobante", "Mensaje relevante", "Nota adicional"],
    en: {
      title: "Other",
      description: "Simple and flexible structure.",
      exampleTitle: "Organized document",
      summary: "I want to organize screenshots, receipts and documents in a clear presentation that is easy to review and share.",
      checklist: ["Main file", "Receipt", "Messages", "Photos", "Case notes"],
      evidence: ["Main file", "Receipt", "Relevant message", "Additional note"]
    }
  }
];

const tones = [
  { id: "cordial", es: "Claro y cordial", en: "Clear and friendly" },
  { id: "direct", es: "Breve y directo", en: "Short and direct" },
  { id: "formal", es: "Formal", en: "Formal" },
  { id: "firm", es: "Firme pero respetuoso", en: "Firm but respectful" }
];

const requestOptions = [
  { id: "response", labelKey: "requestResponse", phraseKey: "requestResponsePhrase" },
  { id: "solution", labelKey: "requestSolution", phraseKey: "requestSolutionPhrase" },
  { id: "exchange", labelKey: "requestExchange", phraseKey: "requestExchangePhrase" },
  { id: "refund", labelKey: "requestRefund", phraseKey: "requestRefundPhrase" },
  { id: "review", labelKey: "requestReview", phraseKey: "requestReviewPhrase" },
  { id: "record", labelKey: "requestRecord", phraseKey: "requestRecordPhrase" },
  { id: "other", labelKey: "requestOther", phraseKey: "requestOtherPhrase" }
];

const intentOptions = [
  { id: "request", titleKey: "intentRequestTitle", textKey: "intentRequestText" },
  { id: "organize", titleKey: "intentOrganizeTitle", textKey: "intentOrganizeText" },
  { id: "both", titleKey: "intentBothTitle", textKey: "intentBothText" }
];

const attachmentOptions = [
  { id: "upload", titleKey: "attachmentUploadTitle", textKey: "attachmentUploadText" },
  { id: "none", titleKey: "attachmentNoneTitle", textKey: "attachmentNoneText" },
  { id: "message", titleKey: "attachmentMessageTitle", textKey: "attachmentMessageText" },
  { id: "later", titleKey: "attachmentLaterTitle", textKey: "attachmentLaterText" }
];

const statuses = {
  es: ["En preparación", "Enviado", "En conversación", "Esperando respuesta", "Resuelto"],
  en: ["Preparing", "Sent", "In conversation", "Waiting for response", "Resolved"]
};

const state = {
  lang: navigator.language?.startsWith("en") ? "en" : "es",
  step: 0,
  caseType: caseTypes[0],
  checklist: [],
  items: [],
  credits: 0,
  issuedCredits: 0,
  token: "",
  sortMode: "manual",
  previewReady: false,
  showAllCases: false,
  fastMode: false,
  intent: "both",
  attachmentChoice: "later",
  requestType: "solution",
  tone: "cordial",
  editedTexts: {
    summary: false,
    whatsapp: false,
    email: false,
    form: false
  }
};

function formatMoney(value) {
  return `US$${Number(value).toFixed(2)}`;
}

function dictionary() {
  return translations[state.lang] || translations.es;
}

function text(key) {
  return dictionary()[key] || translations.es[key] || key;
}

function localizedCase(caseType = state.caseType, key) {
  return state.lang === "en" && caseType.en?.[key] ? caseType.en[key] : caseType[key];
}

function localizedChecklist(caseType = state.caseType) {
  return localizedCase(caseType, "checklist") || [];
}

function localizedEvidence(caseType = state.caseType) {
  return localizedCase(caseType, "evidence") || [];
}

function evidenceLabel(index) {
  return `${text("evidence")} ${index + 1}`;
}

const typeKeys = {
  Archivo: "evidence",
  Evidencia: "evidence",
  Comprobante: "receipt",
  Pago: "payment",
  "Conversación": "conversation",
  Documento: "document",
  Foto: "photo",
  Estado: "status",
  Nota: "note"
};

function localizedType(type) {
  return text(typeKeys[type] || "evidence");
}

function currentStepLabels() {
  return stepLabels[state.lang] || stepLabels.es;
}

function currentRequestOption() {
  return requestOptions.find((option) => option.id === state.requestType) || requestOptions[1];
}

function requestLabel() {
  return text(currentRequestOption().labelKey);
}

function requestPhrase() {
  return text(currentRequestOption().phraseKey);
}

function sentenceCase(value) {
  const clean = String(value || "").trim();
  if (!clean) return "";
  return `${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
}

function storyText() {
  return $("#caseStory")?.value.trim() || localizedCase(state.caseType, "summary");
}

function titleText() {
  return $("#caseTitle")?.value.trim() || localizedCase(state.caseType, "exampleTitle");
}

function summaryText() {
  return $("#caseSummary")?.value.trim() || buildAssistedTexts().summary;
}

function readyText(kind) {
  const idByKind = {
    whatsapp: "whatsappText",
    email: "emailText",
    form: "formReadyText"
  };
  const generated = buildAssistedTexts();
  return document.getElementById(idByKind[kind])?.value.trim() || generated[kind] || "";
}

function optionalContext() {
  const parts = [];
  const party = $("#caseParty")?.value.trim();
  const date = $("#caseDate")?.value;
  const reference = $("#caseReference")?.value.trim();
  const attempt = $("#caseAttempt")?.value.trim();
  if (party) parts.push(state.lang === "en" ? `Related to: ${party}.` : `Relacionado con: ${party}.`);
  if (date) parts.push(state.lang === "en" ? `Approximate date: ${date}.` : `Fecha aproximada: ${date}.`);
  if (reference) parts.push(`${text("reference")} ${reference}.`);
  if (attempt) {
    const cleanAttempt = attempt.replace(/[.。]+$/u, "");
    parts.push(
      state.lang === "en"
        ? `I already tried to address it by: ${cleanAttempt}.`
        : `Ya intenté avanzar o resolverlo mediante: ${cleanAttempt}.`
    );
  }
  return parts.join(" ");
}

function buildAssistedTexts() {
  const title = titleText();
  const story = storyText();
  const request = requestPhrase();
  const context = optionalContext();
  const evidenceNote =
    state.items.length > 0
      ? state.lang === "en"
        ? "I am including the available documentation to make the review easier."
        : "Acompaño la documentación disponible para facilitar la revisión."
      : state.lang === "en"
        ? "I can add supporting documents later if needed."
        : "Puedo sumar documentos de respaldo después si hace falta.";

  if (state.lang === "en") {
    const openings = {
      cordial: "Hi, I am contacting you about",
      direct: "Hi, I am writing about",
      formal: "Hello, I am contacting you regarding",
      firm: "Hello, I am contacting you to clearly record"
    };
    const closing = state.tone === "firm" ? "I would appreciate a response through this channel." : "Thank you, I look forward to your response.";
    const summary = `${story} ${context} I am requesting ${request}. ${evidenceNote} ${closing}`.replace(/\s+/g, " ").trim();
    return {
      summary,
      whatsapp: `${openings[state.tone] || openings.cordial} "${title}". ${story} I am requesting ${request}. ${evidenceNote}`,
      email: `${openings[state.tone] || openings.cordial} "${title}".\n\n${story}\n\n${context ? `${context}\n\n` : ""}${evidenceNote} I am requesting ${request} and would appreciate a response through this channel.\n\nThank you.`,
      form: `Case: ${title}\n\nWhat happened:\n${story}\n\nMain request:\nI am requesting ${request}.\n\n${context ? `Details:\n${context}\n\n` : ""}Attached files: ${state.items.length ? `${state.items.length} file(s).` : "none for now."}`
    };
  }

  const openings = {
    cordial: "Hola, me comunico por",
    direct: "Hola, escribo por",
    formal: "Hola, me comunico en relación con",
    firm: "Hola, me comunico para dejar clara la situación sobre"
  };
  const closing = state.tone === "firm" ? "Agradezco una respuesta por este medio." : "Quedo atento/a a una respuesta. Gracias.";
  const summary = `${story} ${context} Solicito ${request}. ${evidenceNote} ${closing}`.replace(/\s+/g, " ").trim();
  return {
    summary,
    whatsapp: `${openings[state.tone] || openings.cordial} "${title}". ${story} Solicito ${request}. ${evidenceNote}`,
    email: `${openings[state.tone] || openings.cordial} "${title}".\n\n${story}\n\n${context ? `${context}\n\n` : ""}${evidenceNote} Solicito ${request} y agradezco una respuesta por este medio.\n\nGracias.`,
    form: `Caso: ${title}\n\nQué pasó:\n${story}\n\nPedido principal:\nSolicito ${request}.\n\n${context ? `Datos adicionales:\n${context}\n\n` : ""}Archivos adjuntos: ${state.items.length ? `${state.items.length} archivo(s).` : "ninguno por ahora."}`
  };
}

function updateAssistedTexts({ force = false } = {}) {
  const generated = buildAssistedTexts();
  const mapping = [
    ["caseSummary", "summary"],
    ["whatsappText", "whatsapp"],
    ["emailText", "email"],
    ["formReadyText", "form"]
  ];
  mapping.forEach(([id, key]) => {
    const field = document.getElementById(id);
    if (!field) return;
    if (force || !state.editedTexts[key]) {
      field.value = generated[key];
    }
  });
  state.previewReady = false;
  renderReview();
  renderClearCase();
  renderCaseMap();
  renderFinalSummary();
  renderReadyToSend();
  renderShareKit();
}

function todayLabel() {
  const locale = state.lang === "en" ? "en-US" : "es-AR";
  return new Date().toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

function cleanFileStem(name) {
  return String(name || "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b(img|image|screenshot|captura|screen|whatsapp|wa|pdf|doc|scan|final|copy|copia)\b/gi, "")
    .replace(/[0-9a-f]{8,}/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function suggestedEvidenceTitle(index, file) {
  const list = localizedEvidence();
  const cleaned = cleanFileStem(file.name);
  const lowerName = String(file.name || "").toLowerCase();
  if (/factura|invoice|ticket|recibo|comprobante/.test(lowerName)) return text("receipt");
  if (/pago|transfer|payment/.test(lowerName)) return text("payment");
  if (/chat|whatsapp|conversaci[oó]n|mensaje/.test(lowerName)) return text("conversation");
  if (/captura|screenshot|foto|imagen|photo|image/.test(lowerName)) return text("photo");
  if (/pedido|orden|order|formulario|contrato/.test(lowerName)) return text("document");
  if (list[index]) return list[index];
  if (cleaned && cleaned.length > 5 && cleaned.length < 36) return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return evidenceLabel(index);
}

function dateFromFilename(name) {
  const value = String(name || "");
  const iso = value.match(/(20\d{2})[-_. ]?(0[1-9]|1[0-2])[-_. ]?([0-2]\d|3[01])/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const local = value.match(/([0-2]\d|3[01])[-_. ](0[1-9]|1[0-2])[-_. ](20\d{2})/);
  if (local) return `${local[3]}-${local[2]}-${local[1]}`;
  return "";
}

function showMessage(text, kind = "note") {
  const messageEl = $("#message");
  if (!messageEl) return;
  messageEl.hidden = !text;
  messageEl.textContent = text || "";
  messageEl.dataset.kind = kind;
}

function track(eventName, payload = {}) {
  const event = { event: eventName, at: new Date().toISOString(), ...payload };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
  try {
    const saved = JSON.parse(localStorage.getItem("pruebapdf.analytics") || "[]").slice(-60);
    saved.push(event);
    localStorage.setItem("pruebapdf.analytics", JSON.stringify(saved));
  } catch {
    // Analytics should never interrupt the builder.
  }
}

function saveCredits() {
  localStorage.setItem(
    "pruebapdf.redeem",
    JSON.stringify({ credits: state.credits, issuedCredits: state.issuedCredits, token: state.token })
  );
}

function loadCredits() {
  const saved = localStorage.getItem("pruebapdf.redeem");
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    state.credits = Number(parsed.credits || 0);
    state.issuedCredits = Number(parsed.issuedCredits || 0);
    state.token = String(parsed.token || "");
  } catch {
    state.credits = 0;
    state.issuedCredits = 0;
    state.token = "";
  }
}

function updateCredits() {
  const total = state.issuedCredits ? ` de ${state.issuedCredits}` : "";
  const totalText = state.lang === "en" && state.issuedCredits ? ` of ${state.issuedCredits}` : total;
  const textContent = state.credits > 0 ? `${text("downloadsAvailable")}: ${state.credits}${totalText}` : text("pastePurchaseCode");
  ["#creditLabel", "#creditLabelLarge"].forEach((selector) => {
    const element = $(selector);
    if (element) element.textContent = selector === "#creditLabelLarge" && state.credits <= 0 ? text("pasteEmailCode") : textContent;
  });
  const cleanButton = $("#cleanButton");
  if (cleanButton) cleanButton.disabled = state.credits <= 0 || !state.token;
}

function syncCodeInputs(value) {
  ["#purchaseCode", "#purchaseCodeLarge"].forEach((selector) => {
    const input = $(selector);
    if (input && input.value !== value) input.value = value;
  });
}

function setBusy(isBusy) {
  ["redeemButton", "redeemButtonLarge", "previewButton", "cleanButton", "nextStep", "backStep"].forEach((id) => {
    const button = document.getElementById(id);
    if (button) button.disabled = isBusy || (id === "cleanButton" && (state.credits <= 0 || !state.token));
  });
}

function applyTranslations() {
  const dictionary = translations[state.lang] || translations.es;
  document.documentElement.lang = state.lang;
  $$("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.textContent = dictionary[key];
  });
  $$("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) element.placeholder = dictionary[key];
  });
  $("#languageToggle").textContent = state.lang === "es" ? "ES / EN" : "EN / ES";
}

function initPrices() {
  $("#priceSingle").textContent = formatMoney(config.prices.singleUsd);
  $("#pricePack5").textContent = formatMoney(config.prices.pack5Usd);
  $("#pricePack20").textContent = formatMoney(config.prices.pack20Usd);
  [
    ["#paySingle", config.paymentLinks.single],
    ["#payPack5", config.paymentLinks.pack5],
    ["#payPack20", config.paymentLinks.pack20],
    ["#quickSingle", config.paymentLinks.single],
    ["#quickPack5", config.paymentLinks.pack5],
    ["#quickPack20", config.paymentLinks.pack20]
  ].forEach(([selector, link]) => {
    const element = $(selector);
    if (element) element.href = link;
  });
}

function selectCase(caseType) {
  state.caseType = caseType;
  state.checklist = localizedChecklist(caseType).map((_, index) => ({ index, status: "later" }));
  state.editedTexts = { summary: false, whatsapp: false, email: false, form: false };
  $("#caseTitle").value = localizedCase(caseType, "exampleTitle");
  const story = $("#caseStory");
  if (story) story.value = localizedCase(caseType, "summary");
  renderCases();
  renderRequestOptions();
  renderSummaryOptions();
  renderChecklist();
  renderItems();
  updateAssistedTexts({ force: true });
}

function renderCases() {
  const grid = $("#caseGrid");
  grid.innerHTML = "";
  const visibleCases = state.showAllCases ? caseTypes : caseTypes.slice(0, 4);
  visibleCases.forEach((caseType) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `case-option${caseType.id === state.caseType.id ? " is-selected" : ""}`;
    button.innerHTML = `
      <span aria-hidden="true">${caseType.icon}</span>
      <strong>${localizedCase(caseType, "title")}</strong>
      <small>${localizedCase(caseType, "description")}</small>
    `;
    button.addEventListener("click", () => {
      selectCase(caseType);
      track("case_selected", { caseType: caseType.id });
    });
    grid.appendChild(button);
  });
  const moreButton = $("#showMoreCases");
  if (moreButton) {
    moreButton.hidden = state.showAllCases;
  }
}

function renderSummaryOptions() {
  const row = $("#summaryOptions");
  if (!row) return;
  const options = summaryOptionsForCase();
  row.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.label;
    button.addEventListener("click", () => {
      $("#caseStory").value = option.text;
      state.editedTexts = { summary: false, whatsapp: false, email: false, form: false };
      updateAssistedTexts({ force: true });
    });
    row.appendChild(button);
  });
}

function renderRequestOptions() {
  const row = $("#requestOptions");
  if (!row) return;
  row.innerHTML = "";
  requestOptions.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `request-option${option.id === state.requestType ? " is-selected" : ""}`;
    button.innerHTML = `<strong>${text(option.labelKey)}</strong><span>${text(option.phraseKey)}</span>`;
    button.addEventListener("click", () => {
      state.requestType = option.id;
      state.editedTexts = { summary: false, whatsapp: false, email: false, form: false };
      renderRequestOptions();
      updateAssistedTexts({ force: true });
      track("request_selected", { requestType: option.id });
    });
    row.appendChild(button);
  });
}

function renderIntentOptions() {
  const grid = $("#intentGrid");
  if (!grid) return;
  grid.innerHTML = "";
  intentOptions.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-card${option.id === state.intent ? " is-selected" : ""}`;
    button.innerHTML = `<strong>${text(option.titleKey)}</strong><span>${text(option.textKey)}</span>`;
    button.addEventListener("click", () => {
      state.intent = option.id;
      renderIntentOptions();
      track("intent_selected", { intent: option.id });
    });
    grid.appendChild(button);
  });
}

function renderAttachmentChoices() {
  const grid = $("#attachmentChoices");
  if (!grid) return;
  grid.innerHTML = "";
  attachmentOptions.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-card${option.id === state.attachmentChoice ? " is-selected" : ""}`;
    button.innerHTML = `<strong>${text(option.titleKey)}</strong><span>${text(option.textKey)}</span>`;
    button.addEventListener("click", () => {
      state.attachmentChoice = option.id;
      renderAttachmentChoices();
      showMessage(option.id === "upload" ? "" : text("noFilesEmpty"), "note");
      track("attachment_choice_selected", { attachmentChoice: option.id });
    });
    grid.appendChild(button);
  });
}

function summaryOptionsForCase() {
  const generic =
    state.lang === "en"
      ? [
          { label: "Organize a purchase", text: "I need to organize receipts, conversations and images related to a purchase." },
          { label: "Show an issue", text: "I want to gather information about a product issue and present it clearly." },
          { label: "Organize a procedure", text: "I want to clearly present files related to a personal procedure or task." }
        ]
      : [
          { label: "Ordenar una compra", text: "Necesito ordenar comprobantes, conversaciones e imágenes relacionadas con una compra." },
          { label: "Mostrar un problema", text: "Quiero reunir información sobre un problema con un producto para presentarla de forma clara." },
          { label: "Ordenar un trámite", text: "Quiero presentar de forma clara los archivos relacionados con un trámite o gestión personal." }
        ];
  const byCase =
    state.lang === "en"
      ? {
          online: [
            { label: "Online purchase", text: "I need to organize receipts, conversations and details from an online purchase." },
            { label: "Pending order", text: "I want to show the order information, payment made and current status." },
            { label: "Seller", text: "I want to gather messages, receipts and seller details in one document." }
          ],
          warranty: [
            { label: "Warranty", text: "I want to organize invoice, photos and messages for a warranty request or follow-up." },
            { label: "Support", text: "I need to gather the information sent to support and the responses received." },
            { label: "Product", text: "I want to show the purchase date, issue and available receipts." }
          ],
          service: [
            { label: "Service", text: "I want to clearly present files related to a hired service." },
            { label: "Payments", text: "I need to organize agreements, payments, messages and important dates for a service." },
            { label: "Follow-up", text: "I want to summarize the current status and main communications." }
          ]
        }
      : {
          online: [
            { label: "Compra online", text: "Necesito ordenar comprobantes, conversaciones y datos de una compra online." },
            { label: "Pedido pendiente", text: "Quiero mostrar la información de un pedido, el pago realizado y el estado actual." },
            { label: "Vendedor", text: "Quiero reunir mensajes, comprobantes y datos del vendedor en un solo documento." }
          ],
          warranty: [
            { label: "Garantía", text: "Quiero organizar factura, fotos y mensajes para solicitar o seguir una garantía." },
            { label: "Soporte", text: "Necesito reunir la información enviada a soporte y las respuestas recibidas." },
            { label: "Producto", text: "Quiero mostrar la fecha de compra, el inconveniente y los comprobantes disponibles." }
          ],
          service: [
            { label: "Servicio", text: "Quiero presentar de forma clara los archivos relacionados con un servicio contratado." },
            { label: "Pagos", text: "Necesito ordenar acuerdos, pagos, mensajes y fechas importantes de un servicio." },
            { label: "Seguimiento", text: "Quiero resumir el estado actual y las comunicaciones principales." }
          ]
        };
  return byCase[state.caseType.id] || generic;
}

function renderTones() {
  const row = $("#toneRow");
  row.innerHTML = "";
  tones.forEach((tone) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = tone.id === state.tone ? "is-selected" : "";
    button.textContent = tone[state.lang] || tone.es;
    button.addEventListener("click", () => {
      state.tone = tone.id;
      state.editedTexts = { summary: false, whatsapp: false, email: false, form: false };
      renderTones();
      updateAssistedTexts({ force: true });
    });
    row.appendChild(button);
  });
}

function renderChecklist() {
  const list = $("#checklist");
  list.innerHTML = "";
  state.checklist.forEach((entry, index) => {
    const label = localizedChecklist()[entry.index ?? index] || entry.label || "";
    const article = document.createElement("button");
    article.type = "button";
    article.className = "check-item";
    article.classList.toggle("is-selected", entry.status === "have");
    article.innerHTML = `
      <span>${entry.status === "have" ? "✓" : "+"}</span>
      <strong>${label}</strong>
      <small>${entry.status === "have" ? text("addedToMap") : text("tapIfHave")}</small>
    `;
    article.addEventListener("click", () => {
      state.checklist[index].status = entry.status === "have" ? "later" : "have";
      renderChecklist();
      renderReview();
    });
    list.appendChild(article);
  });
}

function renderSteps() {
  const list = $("#stepsList");
  list.innerHTML = "";
  const steps = currentStepLabels();
  steps.forEach((label, index) => {
    const item = document.createElement("li");
    item.className = index === state.step ? "is-current" : index < state.step ? "is-done" : "";
    item.innerHTML = `<span>${index + 1}</span>${label}`;
    item.addEventListener("click", () => showStep(index));
    list.appendChild(item);
  });
  $("#progressPercent").textContent = `${text("progressStep")} ${state.step + 1} ${state.lang === "en" ? "of" : "de"} ${steps.length}`;
  $("#progressBar").style.width = `${((state.step + 1) / steps.length) * 100}%`;
}

function showStep(index) {
  const steps = currentStepLabels();
  state.step = Math.max(0, Math.min(steps.length - 1, index));
  $$(".wizard-step").forEach((step) => step.classList.toggle("is-active", Number(step.dataset.step) === state.step));
  $("#backStep").hidden = state.step === 0;
  $("#nextStep").hidden = state.step === steps.length - 1;
  renderSteps();
  renderReview();
  renderClearCase();
  renderReadyToSend();
  renderShareKit();
  showMessage("");
}

function validateStep() {
  return true;
}

function nextStep() {
  if (!validateStep()) return;
  showStep(state.step + 1);
  track("wizard_next", { step: state.step + 1 });
}

function previousStep() {
  showStep(state.step - 1);
}

async function addFiles(files) {
  const accepted = ["image/jpeg", "image/png", "image/webp", "application/pdf", "text/plain"];
  const incoming = Array.from(files || []);
  const supported = incoming.filter((file) => (accepted.includes(file.type) || /\.txt$/i.test(file.name)) && file.size <= 25 * 1024 * 1024);
  if (supported.length !== incoming.length) {
    showMessage(text("unsupportedFiles"), "warning");
  }
  for (const file of supported) {
    const index = state.items.length;
    const isText = file.type === "text/plain" || /\.txt$/i.test(file.name);
    const textContent = isText ? await file.text().catch(() => "") : "";
    state.items.push({
      id: crypto.randomUUID(),
      file,
      title: suggestedEvidenceTitle(index, file),
      type: guessType(file, index),
      date: dateFromFilename(file.name),
      description: textContent ? textContent.replace(/\s+/g, " ").trim().slice(0, 180) : suggestDescription(index),
      textContent,
      previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : ""
    });
  }
  state.previewReady = false;
  if (supported.length) state.attachmentChoice = "upload";
  renderAttachmentChoices();
  renderItems();
  updateAssistedTexts();
  if (supported.length) track("files_added", { count: supported.length });
}

function guessType(file, index) {
  const name = file.name.toLowerCase();
  if (/factura|invoice|ticket|recibo|comprobante/.test(name)) return "Comprobante";
  if (/chat|whatsapp|conversaci[oó]n|mensaje/.test(name)) return "Conversación";
  if (/pago|transfer|payment/.test(name)) return "Pago";
  if (/captura|screenshot|foto|imagen|photo|image/.test(name) || file.type.startsWith("image/")) return "Foto";
  if (file.type === "application/pdf") return "Documento";
  if (file.type === "text/plain" || /\.txt$/i.test(file.name)) return "Documento";
  return "Archivo";
}

function suggestDescription(index) {
  const suggestions =
    state.lang === "en"
      ? [
          "Shows the main detail for this part of the case.",
          "Helps support the order of events.",
          "Adds context and helps explain the situation.",
          "Provides extra information to review the case."
        ]
      : [
          "Muestra el dato principal de esta parte del caso.",
          "Sirve para respaldar el orden de los hechos.",
          "Complementa el resumen y ayuda a entender la situación.",
          "Aporta contexto adicional para revisar el caso."
        ];
  return suggestions[index % suggestions.length];
}

function renderItems() {
  const container = $("#items");
  container.innerHTML = "";
  if (!state.items.length) {
    container.innerHTML =
      `<div class="empty">${text("noFilesEmpty")}</div>`;
    return;
  }

  const items = sortedItems();
  items.forEach((item, visibleIndex) => {
    const originalIndex = state.items.findIndex((entry) => entry.id === item.id);
    const article = document.createElement("article");
    article.className = "item";
    const thumb = document.createElement("div");
    thumb.className = "thumb";
    if (item.previewUrl) {
      const image = document.createElement("img");
      image.src = item.previewUrl;
      image.alt = "";
      thumb.appendChild(image);
    } else if (item.file.type === "text/plain" || /\.txt$/i.test(item.file.name)) {
      thumb.innerHTML = "<span>TXT</span>";
    } else {
      thumb.innerHTML = "<span>DOC</span>";
    }

    const body = document.createElement("div");
    body.className = "item-body";
    body.innerHTML = `
      <div class="evidence-head">
        <strong>${evidenceLabel(visibleIndex)}</strong>
        <span>${localizedType(item.type)}${item.date ? ` · ${escapeHtml(item.date)}` : ""}</span>
      </div>
    `;

    const fields = document.createElement("div");
    fields.className = "item-fields";
    fields.append(
      inputFor(item, "title", text("cleanTitle"), () => {
        renderReview();
      }),
      inputFor(item, "description", text("shortDescription"), () => renderReview())
    );
    const details = document.createElement("details");
    details.className = "item-advanced";
    details.innerHTML = `<summary>${text("editTypeDate")}</summary>`;
    const advancedFields = document.createElement("div");
    advancedFields.className = "item-advanced-fields";
    advancedFields.append(
      selectFor(item, "type", ["Archivo", "Comprobante", "Pago", "Conversación", "Documento", "Foto", "Estado", "Nota"], () => {
        renderItems();
        renderReview();
      }),
      dateFor(item, () => {
        renderReview();
      })
    );
    details.appendChild(advancedFields);
    body.appendChild(fields);
    body.appendChild(details);

    const tools = document.createElement("div");
    tools.className = "tool-buttons";
    [
      ["↑", () => moveItem(originalIndex, -1), text("uploadEvidence")],
      ["↓", () => moveItem(originalIndex, 1), text("moveEvidenceDown")],
      ["×", () => removeItem(originalIndex), text("deleteEvidence")]
    ].forEach(([label, action, aria]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.setAttribute("aria-label", aria);
      button.addEventListener("click", action);
      tools.appendChild(button);
    });

    article.append(thumb, body, tools);
    container.appendChild(article);
  });
}

function inputFor(item, key, placeholder, onInput) {
  const input = document.createElement("input");
  input.placeholder = placeholder;
  input.value = item[key] || "";
  input.addEventListener("input", () => {
    item[key] = input.value;
    state.previewReady = false;
    onInput?.();
  });
  return input;
}

function selectFor(item, key, options, onInput) {
  const select = document.createElement("select");
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = localizedType(option);
    select.appendChild(opt);
  });
  select.value = item[key] || options[0];
  select.addEventListener("change", () => {
    item[key] = select.value;
    state.previewReady = false;
    onInput?.();
  });
  return select;
}

function dateFor(item, onInput) {
  const input = document.createElement("input");
  input.type = "date";
  input.value = item.date || "";
  input.addEventListener("input", () => {
    item.date = input.value;
    state.previewReady = false;
    onInput?.();
  });
  return input;
}

function sortedItems() {
  const items = [...state.items];
  if (state.sortMode === "date") {
    return items.sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
  }
  if (state.sortMode === "type") {
    return items.sort((a, b) => a.type.localeCompare(b.type));
  }
  return items;
}

function moveItem(index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= state.items.length) return;
  const copy = [...state.items];
  [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
  state.items = copy;
  state.sortMode = "manual";
  state.previewReady = false;
  renderItems();
  renderReview();
  renderClearCase();
  renderCaseMap();
  renderFinalSummary();
  renderReadyToSend();
}

function removeItem(index) {
  const [removed] = state.items.splice(index, 1);
  if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
  state.previewReady = false;
  renderItems();
  renderReview();
  renderClearCase();
  renderCaseMap();
  renderFinalSummary();
  renderReadyToSend();
}

function estimatePages() {
  const documentPages = state.items.filter((item) => item.file.type === "application/pdf").length;
  const basePages = state.items.length ? 3 : 2;
  return Math.max(basePages, basePages + state.items.length + documentPages);
}

function renderCaseMap() {
  const map = $("#caseMap");
  if (!map) return;
  const have = state.checklist.filter((entry) => entry.status === "have");
  const suggestions = missingSuggestions();
  map.innerHTML = `
    <article>
      <span>1</span>
      <strong>${text("caseMap1")}</strong>
      <small>${escapeHtml(localizedCase(state.caseType, "title"))}</small>
      <p>${escapeHtml(storyText()).slice(0, 190)}</p>
    </article>
    <article>
      <span>2</span>
      <strong>${text("caseMap2")}</strong>
      <small>${escapeHtml(requestLabel())}</small>
      <p>${escapeHtml(requestPhrase())}</p>
    </article>
    <article>
      <span>3</span>
      <strong>${text("caseMap3")}</strong>
      <small>${state.items.length} ${text("filesAdded")}</small>
      <p>${have.length} ${text("readyMarked")}</p>
    </article>
    <article>
      <span>4</span>
      <strong>${text("caseMap4")}</strong>
      <small>${suggestions.length ? text("optional") : text("complete")}</small>
      <p>${suggestions.length ? suggestions.map(escapeHtml).join(", ") : text("noMissingNeeded")}</p>
    </article>
  `;
}

function missingSuggestions() {
  const suggestions = [];
  if (!$("#caseDate")?.value) suggestions.push(text("missingDate"));
  if (!$("#caseReference")?.value.trim()) suggestions.push(text("missingReference"));
  if (!state.items.length) suggestions.push(text("missingEvidence"));
  if (!$("#caseAttempt")?.value.trim()) suggestions.push(text("missingAttempt"));
  return suggestions.slice(0, 3);
}

function thingsYouHave() {
  const items = [];
  if (state.items.length) items.push(`${state.items.length} ${text("filesAddedMetric")}`);
  const haveCount = state.checklist.filter((entry) => entry.status === "have").length;
  if (haveCount) items.push(`${haveCount} ${text("markedData")}`);
  if ($("#caseReference")?.value.trim()) items.push(text("reference"));
  if ($("#caseDate")?.value) items.push(text("dateLabel"));
  return items.length ? items : [text("baseReady")];
}

function renderClearCase() {
  const panel = $("#clearCase");
  if (!panel) return;
  const suggestions = missingSuggestions();
  const nextSteps = [text("nextStepReview"), text("nextStepPreview"), text("nextStepSend")];
  panel.innerHTML = `
    <article class="clear-card clear-card-main">
      <span>${text("understoodTitle")}</span>
      <p>${escapeHtml(storyText())}</p>
    </article>
    <article class="clear-card">
      <span>${text("requestTitle")}</span>
      <p>${escapeHtml(sentenceCase(requestPhrase()))}.</p>
    </article>
    <article class="clear-card">
      <span>${text("alreadyHaveTitle")}</span>
      <ul>${thingsYouHave().map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="clear-card">
      <span>${text("couldAddTitle")}</span>
      <ul>${(suggestions.length ? suggestions : [text("noMissingNeeded")]).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="clear-card clear-card-wide">
      <span>${text("readyToSend")}</span>
      <p>${escapeHtml(readyText("whatsapp"))}</p>
    </article>
    <article class="clear-card clear-card-wide">
      <span>${text("nextStepsTitle")}</span>
      <ol>${nextSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
    </article>
  `;
}

function renderFinalSummary() {
  const panel = $("#finalSummary");
  if (!panel) return;
  const title = $("#caseTitle")?.value.trim() || localizedCase(state.caseType, "exampleTitle");
  const haveCount = state.checklist.filter((entry) => entry.status === "have").length;
  panel.innerHTML = `
    <div>
      <span class="pill">${escapeHtml(localizedCase(state.caseType, "title"))}</span>
      <h4>${text("finalTitle")}</h4>
      <p>${escapeHtml(title)}</p>
      <p><strong>${text("mainRequestLabel")}</strong> ${escapeHtml(requestLabel())}</p>
    </div>
    <div class="final-grid">
      <article>
        <strong>${state.items.length}</strong>
        <span>${text("filesAddedMetric")}</span>
      </article>
      <article>
        <strong>${estimatePages()}</strong>
        <span>${text("estimatedPages")}</span>
      </article>
      <article>
        <strong>${haveCount}</strong>
        <span>${text("markedData")}</span>
      </article>
    </div>
    <div class="final-includes">
      <p><strong>${text("fullDocumentLabel")}</strong> ${text("fullDocumentIncludes")}</p>
      <p><strong>${text("summaryLabel")}</strong> ${text("summaryIncludes")}</p>
      <p><strong>${text("readyToSend")}</strong> ${escapeHtml(readyText("whatsapp")).slice(0, 180)}</p>
    </div>
  `;
}

function renderReadyToSend() {
  const panel = $("#readySend");
  if (!panel) return;
  const title = titleText();
  const party = $("#caseParty")?.value.trim();
  const subject = `${title}${party ? ` - ${party}` : ""}`;
  const whatsapp = readyText("whatsapp");
  const email = readyText("email");
  const form = readyText("form");
  const documentText = state.items.length ? text("documentBlockText") : text("documentNoFilesText");
  panel.innerHTML = `
    <div class="ready-send-intro">
      <h4>${text("readySendTitle")}</h4>
      <p>${text("readySendLead")}</p>
    </div>
    <div class="ready-send-grid">
      <article class="ready-send-card">
        <span>${text("whatsappBlockTitle")}</span>
        <p>${escapeHtml(whatsapp)}</p>
        <div>
          <button type="button" data-copy-ready="${escapeAttribute(whatsapp)}">${text("copyWhatsApp")}</button>
          <button type="button" data-open-whatsapp="${escapeAttribute(whatsapp)}">${text("openWhatsAppAction")}</button>
        </div>
      </article>
      <article class="ready-send-card">
        <span>${text("emailBlockTitle")}</span>
        <p>${escapeHtml(email)}</p>
        <div>
          <button type="button" data-copy-ready="${escapeAttribute(email)}">${text("copyEmail")}</button>
          <button type="button" data-open-email="${escapeAttribute(email)}" data-subject="${escapeAttribute(subject)}">${text("openEmailAction")}</button>
          <button type="button" data-copy-ready="${escapeAttribute(form)}">${text("copyForm")}</button>
        </div>
      </article>
      <article class="ready-send-card document-ready-card">
        <span>${text("documentBlockTitle")}</span>
        <p>${documentText}</p>
        <ul>
          <li>${state.items.length} ${text("filesAddedMetric")}</li>
          <li>${estimatePages()} ${text("estimatedPages")}</li>
          <li>${text("summaryIncludes")}</li>
        </ul>
        <div>
          <button type="button" data-go-unlock>${text("goToUnlock")}</button>
        </div>
      </article>
    </div>
  `;
  bindReadyActions(panel);
}

async function copyReadyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const area = document.createElement("textarea");
    area.value = value;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  showMessage(text("copied"), "success");
}

function bindReadyActions(panel) {
  panel.querySelectorAll("[data-copy-ready]").forEach((button) => {
    button.addEventListener("click", () => copyReadyText(button.dataset.copyReady || ""));
  });
  panel.querySelectorAll("[data-open-whatsapp]").forEach((button) => {
    button.addEventListener("click", () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(button.dataset.openWhatsapp || "")}`, "_blank", "noreferrer");
    });
  });
  panel.querySelectorAll("[data-open-email]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = `mailto:?subject=${encodeURIComponent(button.dataset.subject || titleText())}&body=${encodeURIComponent(button.dataset.openEmail || "")}`;
    });
  });
  panel.querySelectorAll("[data-go-unlock]").forEach((button) => {
    button.addEventListener("click", () => {
      showStep(4);
      document.querySelector(".unlock-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderReview() {
  const review = $("#reviewCard");
  if (!review) return;
  const haveCount = state.checklist.filter((entry) => entry.status === "have").length;
  const title = $("#caseTitle")?.value.trim() || localizedCase(state.caseType, "exampleTitle");
  const summary = summaryText();
  review.innerHTML = `
    <div>
      <span class="pill">${localizedCase(state.caseType, "title")}</span>
      <h4>${title}</h4>
      <p>${summary}</p>
    </div>
    <ul>
      <li>${state.items.length} ${text("filesAddedMetric")}</li>
      <li>${haveCount} ${text("markedData")}</li>
      <li>${estimatePages()} ${text("estimatedPages")}</li>
      <li>${text("previewReadyInside")}</li>
    </ul>
  `;
  renderClearCase();
  renderCaseMap();
  renderFinalSummary();
  renderReadyToSend();
}

function renderProtectedPreview() {
  const panel = $("#previewPanel");
  const items = sortedItems();
  const visibleItems = items.slice(0, 2);
  const lockedItems = items.slice(2);
  const title = titleText();
  const summary = summaryText();
  const index = items.length
    ? items
        .map((item, itemIndex) => `<li><span>${evidenceLabel(itemIndex)}</span><strong>${escapeHtml(item.title)}</strong></li>`)
        .join("")
    : `<li><span>${text("document")}</span><strong>${text("messageOnlyDocument")}</strong></li>`;
  const visible = visibleItems
    .map((item, itemIndex) => {
      const media = item.previewUrl
        ? `<img src="${item.previewUrl}" alt="">`
        : `<div class="pdf-placeholder">${text("document")}</div>`;
      return `
        <article class="preview-evidence">
          <span>${evidenceLabel(itemIndex)}</span>
          <h5>${escapeHtml(item.title)}</h5>
          <p>${escapeHtml(item.description || "")}</p>
          ${media}
        </article>
      `;
    })
    .join("");
  const locked = lockedItems
    .map(
      (item, itemIndex) => `
        <article class="preview-locked">
          <span>${evidenceLabel(itemIndex + 2)}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <em>${text("fullOnly")}</em>
        </article>
      `
    )
    .join("");
  const noFilePreview = `
    <article class="preview-evidence">
      <span>${text("document")}</span>
      <h5>${text("messageOnlyDocument")}</h5>
      <p>${escapeHtml(readyText("form"))}</p>
      <div class="pdf-placeholder">${text("readyToSend")}</div>
    </article>
  `;

  panel.innerHTML = `
    <div class="preview-document">
      <div class="watermark">${text("previewWatermark")}</div>
      <section class="preview-cover">
        <span>CasoClaro</span>
        <h4>${escapeHtml(title)}</h4>
        <p>${escapeHtml(summary)}</p>
        <p><strong>${text("mainRequestLabel")}</strong> ${escapeHtml(requestLabel())}</p>
      </section>
      <section class="preview-index">
        <h5>${text("indexTitle")}</h5>
        <ol>${index}</ol>
      </section>
      ${renderTimelineHtml(true)}
      <section class="preview-evidence-list">
        ${visible || noFilePreview}
        ${locked}
      </section>
    </div>
  `;
  state.previewReady = true;
  showMessage(text("previewReadyMessage"), "success");
  track("preview_ready", { evidenceCount: state.items.length });
}

function renderTimelineHtml(forPreview = false) {
  const dated = sortedItems()
    .filter((item) => item.date)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (dated.length < 2) return "";
  const rows = dated
    .map((item) => `<li><strong>${escapeHtml(item.date)}</strong><span>${escapeHtml(item.title)}</span></li>`)
    .join("");
  return `<section class="${forPreview ? "preview-timeline" : "timeline-block"}"><h5>${text("timeline")}</h5><ol>${rows}</ol></section>`;
}

function renderShareKit() {
  const kit = $("#shareKit");
  if (!kit) return;
  const title = titleText();
  const summary = summaryText();
  const party = $("#caseParty")?.value.trim();
  const subject = `${title}${party ? ` - ${party}` : ""}`;
  const email = readyText("email");
  const whatsapp = readyText("whatsapp");
  const form = readyText("form");

  kit.innerHTML = `
    <div class="section-title small-title">
      <p class="eyebrow">${text("readyTextEyebrow")}</p>
      <h3>${text("shareTitle")}</h3>
    </div>
    ${copyBlock(text("emailSubject"), subject, "subject")}
    ${copyBlock(text("email"), email, "email")}
    ${copyBlock(text("whatsapp"), whatsapp, "whatsapp")}
    ${copyBlock(text("formText"), form, "form")}
    ${copyBlock(text("summaryLabel"), summary, "summary")}
  `;
  kit.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy);
      showMessage(text("copied"), "success");
    });
  });
  kit.querySelectorAll("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", () => {
      window.open(`https://wa.me/?text=${encodeURIComponent(button.dataset.whatsapp)}`, "_blank", "noreferrer");
    });
  });
  kit.querySelectorAll("[data-mail]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(email)}`;
    });
  });
}

function copyBlock(label, value, kind) {
  const extra =
    kind === "whatsapp"
      ? `<button type="button" data-whatsapp="${escapeAttribute(value)}">${text("openWhatsApp")}</button>`
      : kind === "email"
        ? `<button type="button" data-mail="1">${text("openEmail")}</button>`
        : "";
  return `
    <article class="copy-block">
      <strong>${label}</strong>
      <pre>${escapeHtml(value)}</pre>
      <div>
        <button type="button" data-copy="${escapeAttribute(value)}">${text("copy")}</button>
        ${extra}
      </div>
    </article>
  `;
}

function wrapText(text, maxChars) {
  const words = String(text || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
}

async function imageToBytes(file) {
  if (file.type === "image/jpeg" || file.type === "image/png") {
    return { bytes: await file.arrayBuffer(), type: file.type };
  }
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
  return { bytes: await blob.arrayBuffer(), type: "image/jpeg" };
}

async function imageDimensions(file) {
  const bitmap = await createImageBitmap(file);
  const size = { width: bitmap.width, height: bitmap.height };
  bitmap.close();
  return size;
}

function pdfSafeName(title, suffix) {
  const cleaned = String(title || "CasoClaro")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `${cleaned || "CasoClaro"}-${suffix}.pdf`;
}

async function buildPdf({ mode = "full", watermark = false } = {}) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pageSize = [595.28, 841.89];
  let pageNumber = 1;
  const title = titleText();
  const summary = summaryText();
  const emailReady = readyText("email");
  const formReady = readyText("form");
  const party = $("#caseParty").value.trim();
  const reference = $("#caseReference").value.trim();
  const name = $("#caseName").value.trim();
  const date = $("#caseDate").value || todayLabel();
  const items = sortedItems();

  const drawFooter = (page) => {
    page.drawText(`${text("page")} ${pageNumber}`, { x: 500, y: 28, size: 9, font: regular, color: rgb(0.39, 0.43, 0.5) });
    if (watermark) {
      page.drawText(text("previewWatermark"), {
        x: 82,
        y: 350,
        size: 62,
        font: bold,
        color: rgb(0.74, 0.77, 0.82),
        rotate: degrees(35),
        opacity: 0.5
      });
    }
    pageNumber += 1;
  };

  const drawParagraph = (page, text, x, y, size = 11, maxChars = 86) => {
    let cursor = y;
    wrapText(text, maxChars).forEach((line) => {
      page.drawText(line, { x, y: cursor, size, font: regular, color: rgb(0.13, 0.16, 0.22) });
      cursor -= size + 6;
    });
    return cursor;
  };

  const drawPageHeader = (page, heading) => {
    page.drawText("CasoClaro", { x: 52, y: 792, size: 11, font: bold, color: rgb(0.15, 0.31, 0.72) });
    page.drawText(heading, { x: 52, y: 752, size: 22, font: bold, color: rgb(0.04, 0.08, 0.14) });
  };

  const cover = pdf.addPage(pageSize);
  cover.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: rgb(0.96, 0.98, 1) });
  cover.drawRectangle({ x: 0, y: 0, width: 14, height: pageSize[1], color: rgb(0.15, 0.39, 0.92) });
  cover.drawText("CasoClaro", { x: 52, y: 770, size: 18, font: bold, color: rgb(0.04, 0.08, 0.14) });
  cover.drawText(text("organizedDocument"), { x: 52, y: 744, size: 11, font: regular, color: rgb(0.15, 0.31, 0.72) });
  wrapText(title, 26).slice(0, 3).forEach((line, index) => {
    cover.drawText(line, { x: 52, y: 655 - index * 40, size: 32, font: bold, color: rgb(0.04, 0.08, 0.14) });
  });
  let coverY = 510;
  coverY = drawParagraph(cover, summary, 52, coverY, 12, 72);
  coverY -= 24;
  [
    [text("caseTypeLabel"), localizedCase(state.caseType, "title")],
    [text("dateLabel"), date],
    [text("relatedPartyLabel"), party],
    [text("reference"), reference],
    [text("preparedByLabel"), name]
  ]
    .filter(([, value]) => value)
    .forEach(([label, value]) => {
      cover.drawText(label, { x: 52, y: coverY, size: 9, font: bold, color: rgb(0.39, 0.43, 0.5) });
      cover.drawText(String(value).slice(0, 70), { x: 170, y: coverY, size: 10, font: regular, color: rgb(0.13, 0.16, 0.22) });
      coverY -= 22;
    });
  drawFooter(cover);

  const summaryPage = pdf.addPage(pageSize);
  drawPageHeader(summaryPage, mode === "summary" ? text("executiveSummary") : text("caseSummaryPdf"));
  let y = drawParagraph(summaryPage, summary, 52, 715, 12, 82);
  y -= 18;
  summaryPage.drawText(text("mainRequestLabel"), { x: 52, y, size: 14, font: bold, color: rgb(0.04, 0.08, 0.14) });
  y -= 22;
  y = drawParagraph(summaryPage, requestLabel(), 64, y, 11, 78);
  y -= 12;
  summaryPage.drawText(text("readyToSend"), { x: 52, y, size: 14, font: bold, color: rgb(0.04, 0.08, 0.14) });
  y -= 22;
  y = drawParagraph(summaryPage, mode === "summary" ? formReady : emailReady, 64, y, 10, 90);
  y -= 14;
  summaryPage.drawText(text("checklist"), { x: 52, y, size: 14, font: bold, color: rgb(0.04, 0.08, 0.14) });
  y -= 24;
  state.checklist.forEach((entry, index) => {
    if (y < 72) return;
    const status = entry.status === "have" ? text("iHaveIt") : text("addLater");
    const label = localizedChecklist()[entry.index ?? index] || entry.label || "";
    summaryPage.drawText(`${status}: ${label}`.slice(0, 94), { x: 64, y, size: 10, font: regular, color: rgb(0.13, 0.16, 0.22) });
    y -= 18;
  });
  drawFooter(summaryPage);

  const indexPage = pdf.addPage(pageSize);
  drawPageHeader(indexPage, text("evidenceIndexPdf"));
  let indexY = 708;
  if (!items.length) {
    drawParagraph(indexPage, text("documentNoFilesText"), 52, indexY, 11, 82);
  } else {
    items.forEach((item, index) => {
      indexPage.drawText(evidenceLabel(index), { x: 52, y: indexY, size: 10, font: bold, color: rgb(0.15, 0.31, 0.72) });
      indexPage.drawText(item.title.slice(0, 58), { x: 145, y: indexY, size: 10, font: regular, color: rgb(0.13, 0.16, 0.22) });
      if (item.date) indexPage.drawText(item.date, { x: 470, y: indexY, size: 9, font: regular, color: rgb(0.39, 0.43, 0.5) });
      indexY -= 22;
    });
  }
  drawFooter(indexPage);

  const dated = items.filter((item) => item.date).sort((a, b) => a.date.localeCompare(b.date));
  if (dated.length >= 2) {
    const timeline = pdf.addPage(pageSize);
    drawPageHeader(timeline, text("timeline"));
    let timelineY = 708;
    dated.forEach((item) => {
      timeline.drawCircle({ x: 61, y: timelineY + 3, size: 4, color: rgb(0.15, 0.39, 0.92) });
      timeline.drawText(item.date, { x: 82, y: timelineY, size: 10, font: bold, color: rgb(0.13, 0.16, 0.22) });
      timeline.drawText(item.title.slice(0, 62), { x: 166, y: timelineY, size: 10, font: regular, color: rgb(0.13, 0.16, 0.22) });
      timelineY -= 28;
    });
    drawFooter(timeline);
  }

  if (mode === "summary") {
    return new Blob([await pdf.save()], { type: "application/pdf" });
  }

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const page = pdf.addPage(pageSize);
    drawPageHeader(page, evidenceLabel(index));
    page.drawText(item.title.slice(0, 80), { x: 52, y: 724, size: 15, font: bold, color: rgb(0.04, 0.08, 0.14) });
    page.drawText(localizedType(item.type), { x: 52, y: 700, size: 10, font: regular, color: rgb(0.15, 0.31, 0.72) });
    if (item.date) {
      page.drawText(`${text("datePrefix")}: ${item.date}`, { x: 415, y: 700, size: 10, font: regular, color: rgb(0.39, 0.43, 0.5) });
    }
    const contentY = item.description ? drawParagraph(page, item.description, 52, 672, 10, 86) - 12 : 650;

    if (item.file.type === "application/pdf") {
      page.drawRectangle({ x: 52, y: contentY - 90, width: 490, height: 72, color: rgb(0.94, 0.96, 0.99) });
      page.drawText(text("attachedPdf"), {
        x: 76,
        y: contentY - 52,
        size: 12,
        font: bold,
        color: rgb(0.13, 0.16, 0.22)
      });
      drawFooter(page);
      const source = await PDFDocument.load(await item.file.arrayBuffer());
      const copiedPages = await pdf.copyPages(source, source.getPageIndices());
      copiedPages.forEach((copiedPage) => {
        pdf.addPage(copiedPage);
        drawFooter(copiedPage);
      });
    } else if (item.file.type === "text/plain" || /\.txt$/i.test(item.file.name)) {
      page.drawRectangle({ x: 52, y: 58, width: 490, height: Math.max(140, contentY - 84), color: rgb(0.98, 0.99, 1) });
      page.drawText(text("attachedText"), {
        x: 72,
        y: contentY - 36,
        size: 12,
        font: bold,
        color: rgb(0.13, 0.16, 0.22)
      });
      drawParagraph(page, item.textContent || (await item.file.text().catch(() => "")), 72, contentY - 62, 10, 82);
      drawFooter(page);
    } else {
      const converted = await imageToBytes(item.file);
      const dims = await imageDimensions(item.file);
      const image = converted.type === "image/png" ? await pdf.embedPng(converted.bytes) : await pdf.embedJpg(converted.bytes);
      const maxWidth = 490;
      const maxHeight = Math.max(250, contentY - 80);
      const scale = Math.min(maxWidth / dims.width, maxHeight / dims.height, 1);
      const width = dims.width * scale;
      const height = dims.height * scale;
      page.drawImage(image, { x: 52 + (maxWidth - width) / 2, y: 60, width, height });
      drawFooter(page);
    }
  }

  return new Blob([await pdf.save()], { type: "application/pdf" });
}

async function downloadPaidPackage() {
  if (state.credits <= 0 || !state.token) {
    showMessage(text("enableDownloads"), "warning");
    return;
  }
  setBusy(true);
  showMessage(text("preparingDocs"), "note");
  try {
    const [fullBlob, summaryBlob] = await Promise.all([buildPdf({ mode: "full" }), buildPdf({ mode: "summary" })]);
    const consumeResponse = await fetch("/api/consume-credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: state.token })
    });
    const consumeData = await consumeResponse.json();
    if (!consumeResponse.ok || !consumeData.ok) {
      showMessage(consumeData.message || text("cannotDiscount"), "warning");
      if (consumeResponse.status === 401 || consumeResponse.status === 404) {
        state.credits = 0;
        state.issuedCredits = 0;
        state.token = "";
        saveCredits();
        updateCredits();
      }
      return;
    }
    state.credits = Number(consumeData.credits || 0);
    saveCredits();
    updateCredits();
    const title = $("#caseTitle").value.trim() || "CasoClaro";
    downloadBlob(fullBlob, pdfSafeName(title, state.lang === "en" ? "full-document" : "documento-completo"));
    setTimeout(() => downloadBlob(summaryBlob, pdfSafeName(title, state.lang === "en" ? "summary" : "resumen")), 500);
    showMessage(`${text("doneRemaining")} ${state.credits} ${text("downloadsUnit")}`, "success");
    track("paid_download", { remainingCredits: state.credits });
  } catch (error) {
    console.error(error);
    showMessage(text("cannotGenerate"), "warning");
  } finally {
    setBusy(false);
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
}

async function redeemCode() {
  const code = ($("#purchaseCodeLarge")?.value || $("#purchaseCode")?.value || "").trim();
  if (!code) {
    showMessage(text("enterPurchaseCode"), "warning");
    return;
  }
  syncCodeInputs(code);
  setBusy(true);
  showMessage(text("validatingCode"), "note");
  try {
    const response = await fetch("/api/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      showMessage(data.message || text("cannotValidate"), "warning");
      return;
    }
    state.credits = Number(data.credits || 0);
    state.issuedCredits = Number(data.issuedCredits || data.credits || 0);
    state.token = String(data.token || "");
    saveCredits();
    updateCredits();
    showMessage(`${text("codeValidated")} ${state.credits} ${text("downloadsUnit")}`, "success");
    track("license_redeemed", { credits: state.credits, issuedCredits: state.issuedCredits });
  } catch {
    showMessage(text("validationOffline"), "warning");
  } finally {
    setBusy(false);
  }
}

async function refreshCreditStatus() {
  if (!state.token) return;
  try {
    const response = await fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: state.token })
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      state.credits = 0;
      state.issuedCredits = 0;
      state.token = "";
      saveCredits();
      updateCredits();
      return;
    }
    state.credits = Number(data.credits || 0);
    state.issuedCredits = Number(data.issuedCredits || data.credits || 0);
    saveCredits();
    updateCredits();
  } catch {
    updateCredits();
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", "&#10;");
}

function bindEvents() {
  $("#languageToggle").addEventListener("click", () => {
    const oldTitle = localizedCase(state.caseType, "exampleTitle");
    const oldStory = localizedCase(state.caseType, "summary");
    const titleInput = $("#caseTitle");
    const storyInput = $("#caseStory");
    const shouldTranslateTitle = !titleInput.value.trim() || titleInput.value.trim() === oldTitle;
    const shouldTranslateStory = !storyInput.value.trim() || storyInput.value.trim() === oldStory;
    state.lang = state.lang === "es" ? "en" : "es";
    state.editedTexts = { summary: false, whatsapp: false, email: false, form: false };
    applyTranslations();
    if (shouldTranslateTitle) titleInput.value = localizedCase(state.caseType, "exampleTitle");
    if (shouldTranslateStory) storyInput.value = localizedCase(state.caseType, "summary");
    populateStatusOptions();
    state.checklist = localizedChecklist().map((_, index) => ({ index, status: state.checklist[index]?.status || "later" }));
    renderCases();
    renderIntentOptions();
    renderAttachmentChoices();
    renderRequestOptions();
    renderSummaryOptions();
    renderTones();
    renderChecklist();
    renderItems();
    updateAssistedTexts({ force: true });
    updateCredits();
    showStep(state.step);
  });
  $("#useTitleExample").addEventListener("click", () => {
    $("#caseTitle").value = localizedCase(state.caseType, "exampleTitle");
    updateAssistedTexts();
  });
  $("#fastModeButton")?.addEventListener("click", () => {
    state.fastMode = true;
    updateAssistedTexts();
    showStep(1);
    showMessage(text("fastReady"), "success");
    track("fast_mode_started");
  });
  $("#showMoreCases")?.addEventListener("click", () => {
    state.showAllCases = true;
    renderCases();
    track("show_more_cases");
  });
  ["caseStory", "caseTitle", "caseDate", "caseParty", "caseReference", "caseName", "caseStatus", "caseAttempt"].forEach((id) => {
    const element = document.getElementById(id);
    element?.addEventListener("input", () => {
      updateAssistedTexts();
    });
  });
  [
    ["caseSummary", "summary"],
    ["whatsappText", "whatsapp"],
    ["emailText", "email"],
    ["formReadyText", "form"]
  ].forEach(([id, key]) => {
    const element = document.getElementById(id);
    element?.addEventListener("input", () => {
      state.editedTexts[key] = true;
      state.previewReady = false;
      renderReview();
      renderShareKit();
    });
  });
  $("#fileInput").addEventListener("change", async (event) => {
    await addFiles(event.target.files);
    event.target.value = "";
  });
  ["sortManual", "sortDate", "sortType"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
      state.sortMode = id.replace("sort", "").toLowerCase();
      renderItems();
      renderReview();
      state.previewReady = false;
    });
  });
  $("#previewButton").addEventListener("click", renderProtectedPreview);
  $("#cleanButton").addEventListener("click", downloadPaidPackage);
  $("#redeemButton")?.addEventListener("click", redeemCode);
  $("#redeemButtonLarge")?.addEventListener("click", redeemCode);
  ["#purchaseCode", "#purchaseCodeLarge"].forEach((selector) => {
    $(selector)?.addEventListener("input", (event) => syncCodeInputs(event.target.value));
  });
  $("#nextStep").addEventListener("click", nextStep);
  $("#backStep").addEventListener("click", previousStep);
  $$("[data-track]").forEach((element) => {
    element.addEventListener("click", () => track(element.dataset.track));
  });
}

function initFormDefaults() {
  populateStatusOptions();
  selectCase(caseTypes[0]);
}

function populateStatusOptions() {
  const status = $("#caseStatus");
  if (!status) return;
  const current = status.value;
  status.innerHTML = "";
  (statuses[state.lang] || statuses.es).forEach((label) => {
    const option = document.createElement("option");
    option.value = label;
    option.textContent = label;
    status.appendChild(option);
  });
  if ([...status.options].some((option) => option.value === current)) {
    status.value = current;
  }
}

function init() {
  applyTranslations();
  initPrices();
  initFormDefaults();
  renderIntentOptions();
  renderAttachmentChoices();
  renderRequestOptions();
  renderTones();
  renderSteps();
  bindEvents();
  loadCredits();
  updateCredits();
  refreshCreditStatus();
  showStep(0);
}

init();
