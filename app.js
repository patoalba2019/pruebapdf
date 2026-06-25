const { PDFDocument, StandardFonts, degrees, rgb } = PDFLib;

const config = window.PRUEBAPDF_CONFIG || {};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const steps = [
  "Elegí tu caso",
  "Texto listo",
  "Qué agregar",
  "Archivos",
  "Vista previa",
  "Descarga"
];

const translations = {
  es: {
    heroEyebrow: "Asistente documental",
    heroTitle: "Convertí capturas, chats y comprobantes en un documento ordenado en minutos.",
    heroLead:
      "Elegí un caso, cargá tus archivos y recibí una estructura clara con portada, resumen, índice, evidencias numeradas y mensajes listos para enviar.",
    heroCta: "Crear documento",
    heroSecondary: "Ver cómo funciona",
    how1Title: "1. Elegí tu caso",
    how1Text: "La app propone estructura y checklist.",
    how2Title: "2. Cargá archivos",
    how2Text: "Títulos limpios y textos sugeridos.",
    how3Title: "3. Revisá y descargá",
    how3Text: "Vista previa y documento completo con código.",
    beforeAfterEyebrow: "Antes y después",
    beforeAfterTitle: "De archivos sueltos a un documento claro",
    beforeLabel: "Antes",
    before1: "Capturas sueltas",
    before2: "Chats dispersos",
    before3: "Comprobantes mezclados",
    afterLabel: "Después",
    after1: "Portada y resumen",
    after2: "Evidencias numeradas",
    after3: "Índice y línea temporal",
    after4: "Mensajes listos para enviar",
    builderEyebrow: "Constructor guiado",
    builderTitle: "Te guiamos paso a paso",
    builderLead: "Elegí una opción, cargá tus archivos y revisá un documento claro. Podés cambiar todo después.",
    progressTitle: "Progreso",
    progressHelp: "Vamos de a un paso. Tu información se mantiene mientras avanzás.",
    step1Title: "¿Qué querés ordenar?",
    step1Lead: "Elegí la opción más parecida. Te preparamos una base automáticamente.",
    quickTitle: "Modo rápido",
    quickText: "Usá textos sugeridos y pasá directo a cargar archivos.",
    quickButton: "Armarlo en 2 minutos",
    showMoreCases: "Ver más opciones",
    step2Title: "Te dejamos un texto listo",
    step2Lead: "Podés dejarlo así o tocar una opción para cambiar el enfoque.",
    fieldTitle: "Título del caso",
    useExample: "Usar ejemplo",
    fieldSummary: "Breve explicación",
    fieldDate: "Fecha aproximada",
    fieldParty: "Empresa o persona",
    fieldReference: "Pedido o referencia",
    fieldName: "Tu nombre",
    fieldStatus: "Estado actual",
    toneTitle: "Estilo del texto",
    advancedBasic: "Agregar datos opcionales",
    step3Title: "Te sugerimos qué agregar",
    step3Lead: "Tocá lo que ya tenés. Esto ayuda a que el documento quede más claro.",
    step4Title: "Agregá fotos o documentos",
    step4Lead: "Podés subir capturas, fotos, comprobantes o documentos. La app propone títulos y orden.",
    uploadTitle: "Subí tus archivos",
    uploadText: "Tocá para elegir archivos o arrastralos acá.",
    advancedFiles: "Opciones para ordenar",
    sortManual: "Mantener mi orden",
    sortDate: "Ordenar por fecha",
    sortType: "Ordenar por tipo",
    step5Title: "Revisá cómo viene quedando",
    step5Lead: "Vas a ver una muestra con marca de agua antes de descargar.",
    step6Title: "Listo para descargar",
    step6Lead: "Primero revisá qué preparaste. Después elegí si ya tenés código o querés comprar.",
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
    freeBadge: "Vista previa protegida",
    freeTitle: "Gratis",
    freeText: "Revisá cómo quedará tu documento.",
    freeAction: "Crear vista previa",
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
    faq1A: "Portada, resumen, índice, línea temporal cuando hay fechas y todas las evidencias cargadas.",
    faq2Q: "¿Qué puedo subir?",
    faq2A: "Fotos, capturas, comprobantes y documentos. Cada archivo se convierte en una evidencia ordenada.",
    faq3Q: "¿Cómo uso un pack?",
    faq3A: "Comprás en Lemon Squeezy, recibís un código por email y lo pegás para habilitar tus descargas."
  },
  en: {
    heroEyebrow: "Document assistant",
    heroTitle: "Turn screenshots, chats and receipts into an organized document in minutes.",
    heroLead:
      "Choose a case, upload your files and get a clear structure with cover, summary, index, numbered evidence and messages ready to send.",
    heroCta: "Create document",
    heroSecondary: "See how it works",
    how1Title: "1. Choose your case",
    how1Text: "The app suggests structure and checklist.",
    how2Title: "2. Upload files",
    how2Text: "Clean titles and suggested text.",
    how3Title: "3. Review and download",
    how3Text: "Preview and full document with code.",
    beforeAfterEyebrow: "Before and after",
    beforeAfterTitle: "From scattered files to a clear document",
    beforeLabel: "Before",
    before1: "Loose screenshots",
    before2: "Scattered chats",
    before3: "Mixed receipts",
    afterLabel: "After",
    after1: "Cover and summary",
    after2: "Numbered evidence",
    after3: "Index and timeline",
    after4: "Messages ready to send",
    builderEyebrow: "Guided builder",
    builderTitle: "We guide you step by step",
    builderLead: "Choose an option, upload your files and review a clear document. You can change everything later.",
    progressTitle: "Progress",
    progressHelp: "One step at a time. Your information stays while you move forward.",
    step1Title: "What do you want to organize?",
    step1Lead: "Choose the closest option. We prepare a starting point automatically.",
    quickTitle: "Quick mode",
    quickText: "Use suggested text and go straight to uploading files.",
    quickButton: "Build it in 2 minutes",
    showMoreCases: "Show more options",
    step2Title: "We prepared text for you",
    step2Lead: "Keep it as is or choose another angle.",
    fieldTitle: "Case title",
    useExample: "Use example",
    fieldSummary: "Short explanation",
    fieldDate: "Approximate date",
    fieldParty: "Company or person",
    fieldReference: "Order or reference",
    fieldName: "Your name",
    fieldStatus: "Current status",
    toneTitle: "Text style",
    advancedBasic: "Add optional details",
    step3Title: "Suggested things to add",
    step3Lead: "Tap what you already have. It helps make the document clearer.",
    step4Title: "Add photos or documents",
    step4Lead: "Upload screenshots, photos, receipts or documents. The app suggests titles and order.",
    uploadTitle: "Upload your files",
    uploadText: "Tap to choose files or drag them here.",
    advancedFiles: "Order options",
    sortManual: "Keep my order",
    sortDate: "Sort by date",
    sortType: "Sort by type",
    step5Title: "Review how it looks",
    step5Lead: "You will see a watermarked sample before downloading.",
    step6Title: "Ready to download",
    step6Lead: "First review what you prepared. Then choose whether you already have a code or want to buy.",
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
    freeBadge: "Protected preview",
    freeTitle: "Free",
    freeText: "Review how your document will look.",
    freeAction: "Create preview",
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
    faq1A: "Cover, summary, index, timeline when dates are available and all uploaded evidence.",
    faq2Q: "What can I upload?",
    faq2A: "Photos, screenshots, receipts and documents. Each file becomes an organized evidence item.",
    faq3Q: "How do I use a pack?",
    faq3A: "Buy through Lemon Squeezy, receive a code by email and paste it to enable your downloads."
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
    evidence: ["Publicación del producto", "Comprobante de pago", "Conversación con el vendedor", "Estado del envío"]
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
    evidence: ["Factura de compra", "Foto del inconveniente", "Mensaje a soporte", "Respuesta recibida"]
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
    evidence: ["Foto general del producto", "Detalle del inconveniente", "Comprobante de compra", "Comunicación enviada"]
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
    evidence: ["Acuerdo del servicio", "Pago realizado", "Mensaje de seguimiento", "Estado actual"]
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
    evidence: ["Acuerdo inicial", "Comprobante de transferencia", "Chat principal", "Estado de entrega"]
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
    evidence: ["Contrato o acuerdo", "Pago registrado", "Foto del estado", "Mensaje relevante"]
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
    evidence: ["Pago realizado", "Detalle del pedido", "Mensaje al comercio", "Respuesta recibida"]
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
    evidence: ["Documento principal", "Comprobante adjunto", "Formulario", "Mensaje relevante"]
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
    evidence: ["Archivo principal", "Comprobante", "Mensaje relevante", "Nota adicional"]
  }
];

const tones = [
  { id: "direct", label: "Claro y directo" },
  { id: "formal", label: "Formal" },
  { id: "short", label: "Breve" },
  { id: "detail", label: "Detallado" }
];

const statuses = ["En preparación", "Enviado", "En conversación", "Esperando respuesta", "Resuelto"];

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
  fastMode: false
};

function formatMoney(value) {
  return `US$${Number(value).toFixed(2)}`;
}

function todayLabel() {
  return new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
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
  const list = state.caseType.evidence || [];
  const cleaned = cleanFileStem(file.name);
  if (list[index]) return list[index];
  if (cleaned && cleaned.length > 5 && cleaned.length < 36) return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return `Evidencia ${index + 1}`;
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
  const text = state.credits > 0 ? `Descargas disponibles: ${state.credits}${total}` : "Pegá tu código de compra.";
  ["#creditLabel", "#creditLabelLarge"].forEach((selector) => {
    const element = $(selector);
    if (element) element.textContent = selector === "#creditLabelLarge" && state.credits <= 0 ? "Pegá el código que recibiste por email para ver tus descargas disponibles." : text;
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
  state.checklist = caseType.checklist.map((label) => ({ label, status: "later" }));
  $("#caseTitle").value = caseType.exampleTitle;
  $("#caseSummary").value = caseType.summary;
  renderCases();
  renderSummaryOptions();
  renderChecklist();
  renderItems();
  renderReview();
  renderCaseMap();
  renderFinalSummary();
  renderShareKit();
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
      <strong>${caseType.title}</strong>
      <small>${caseType.description}</small>
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
      $("#caseSummary").value = option.text;
      renderReview();
      renderCaseMap();
      renderFinalSummary();
      renderShareKit();
    });
    row.appendChild(button);
  });
}

function summaryOptionsForCase() {
  const generic = [
    {
      label: "Ordenar una compra",
      text: "Necesito ordenar comprobantes, conversaciones e imágenes relacionadas con una compra."
    },
    {
      label: "Mostrar un problema",
      text: "Quiero reunir información sobre un problema con un producto para presentarla de forma clara."
    },
    {
      label: "Ordenar un trámite",
      text: "Quiero presentar de forma clara los archivos relacionados con un trámite o gestión personal."
    }
  ];
  const byCase = {
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
    button.textContent = tone.label;
    button.addEventListener("click", () => {
      const base = state.caseType.summary;
      const title = $("#caseTitle").value.trim() || state.caseType.exampleTitle;
      const variants = {
        direct: base,
        formal: `Por medio del presente, dejo organizada la documentación correspondiente a "${title}", incluyendo los elementos principales y evidencias disponibles.`,
        short: `Documentación organizada para "${title}", con resumen, índice y evidencias relevantes.`,
        detail: `${base} El documento incluye resumen, checklist, línea temporal cuando corresponde y evidencias numeradas para facilitar la revisión.`
      };
      $("#caseSummary").value = variants[tone.id];
      renderReview();
    });
    row.appendChild(button);
  });
}

function renderChecklist() {
  const list = $("#checklist");
  list.innerHTML = "";
  state.checklist.forEach((entry, index) => {
    const article = document.createElement("button");
    article.type = "button";
    article.className = "check-item";
    article.classList.toggle("is-selected", entry.status === "have");
    article.innerHTML = `
      <span>${entry.status === "have" ? "✓" : "+"}</span>
      <strong>${entry.label}</strong>
      <small>${entry.status === "have" ? "Agregado al mapa del caso" : "Tocá si ya lo tenés"}</small>
    `;
    article.addEventListener("click", () => {
      state.checklist[index].status = entry.status === "have" ? "later" : "have";
      renderChecklist();
      renderReview();
      renderCaseMap();
      renderFinalSummary();
    });
    list.appendChild(article);
  });
}

function renderSteps() {
  const list = $("#stepsList");
  list.innerHTML = "";
  steps.forEach((label, index) => {
    const item = document.createElement("li");
    item.className = index === state.step ? "is-current" : index < state.step ? "is-done" : "";
    item.innerHTML = `<span>${index + 1}</span>${label}`;
    item.addEventListener("click", () => showStep(index));
    list.appendChild(item);
  });
  $("#progressPercent").textContent = `Paso ${state.step + 1} de ${steps.length}`;
  $("#progressBar").style.width = `${((state.step + 1) / steps.length) * 100}%`;
}

function showStep(index) {
  state.step = Math.max(0, Math.min(steps.length - 1, index));
  $$(".wizard-step").forEach((step) => step.classList.toggle("is-active", Number(step.dataset.step) === state.step));
  $("#backStep").hidden = state.step === 0;
  $("#nextStep").hidden = state.step === steps.length - 1;
  renderSteps();
  renderReview();
  renderShareKit();
  showMessage("");
}

function validateStep() {
  if (state.step === 3 && !state.items.length) {
    showMessage("Subí al menos un archivo para crear la vista previa.", "warning");
    return false;
  }
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

function addFiles(files) {
  const accepted = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  const incoming = Array.from(files || []);
  const supported = incoming.filter((file) => accepted.includes(file.type) && file.size <= 25 * 1024 * 1024);
  if (supported.length !== incoming.length) {
    showMessage("Algunos archivos no se agregaron. Usá fotos, capturas o documentos de hasta 25 MB.", "warning");
  }
  supported.forEach((file) => {
    const index = state.items.length;
    state.items.push({
      id: crypto.randomUUID(),
      file,
      title: suggestedEvidenceTitle(index, file),
      type: guessType(file, index),
      date: "",
      description: suggestDescription(index),
      previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : ""
    });
  });
  state.previewReady = false;
  renderItems();
  renderReview();
  renderCaseMap();
  renderFinalSummary();
  if (supported.length) track("files_added", { count: supported.length });
}

function guessType(file, index) {
  const name = file.name.toLowerCase();
  if (name.includes("factura") || name.includes("invoice") || name.includes("ticket")) return "Comprobante";
  if (name.includes("chat") || name.includes("whatsapp")) return "Conversación";
  if (name.includes("pago") || name.includes("transfer")) return "Pago";
  if (file.type === "application/pdf") return "Documento";
  return state.caseType.evidence[index] || "Evidencia";
}

function suggestDescription(index) {
  const suggestions = [
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
      '<div class="empty">Tus evidencias van a aparecer acá con títulos simples, editables y listos para el documento.</div>';
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
    } else {
      thumb.innerHTML = "<span>Doc</span>";
    }

    const body = document.createElement("div");
    body.className = "item-body";
    body.innerHTML = `
      <div class="evidence-head">
        <strong>Evidencia ${visibleIndex + 1}</strong>
        <span>${item.type}</span>
      </div>
    `;

    const fields = document.createElement("div");
    fields.className = "item-fields";
    fields.append(
      inputFor(item, "title", "Título simple", () => {
        renderReview();
        renderCaseMap();
        renderFinalSummary();
      }),
      inputFor(item, "description", "Descripción breve", () => renderReview())
    );
    const details = document.createElement("details");
    details.className = "item-advanced";
    details.innerHTML = "<summary>Editar tipo o fecha</summary>";
    const advancedFields = document.createElement("div");
    advancedFields.className = "item-advanced-fields";
    advancedFields.append(
      selectFor(item, "type", ["Evidencia", "Comprobante", "Pago", "Conversación", "Documento", "Foto", "Estado", "Nota"], () => {
        renderItems();
        renderReview();
      }),
      dateFor(item, () => {
        renderReview();
        renderCaseMap();
        renderFinalSummary();
      })
    );
    details.appendChild(advancedFields);
    body.appendChild(fields);
    body.appendChild(details);

    const tools = document.createElement("div");
    tools.className = "tool-buttons";
    [
      ["↑", () => moveItem(originalIndex, -1), "Subir evidencia"],
      ["↓", () => moveItem(originalIndex, 1), "Bajar evidencia"],
      ["×", () => removeItem(originalIndex), "Eliminar evidencia"]
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
    opt.textContent = option;
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
  renderCaseMap();
  renderFinalSummary();
}

function removeItem(index) {
  const [removed] = state.items.splice(index, 1);
  if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
  state.previewReady = false;
  renderItems();
  renderReview();
  renderCaseMap();
  renderFinalSummary();
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
  const missing = state.checklist.filter((entry) => entry.status !== "have").slice(0, 2);
  const title = $("#caseTitle")?.value.trim() || state.caseType.exampleTitle;
  map.innerHTML = `
    <article>
      <span>1</span>
      <strong>Tu caso</strong>
      <small>${escapeHtml(state.caseType.title)}</small>
      <p>${escapeHtml(title)}</p>
    </article>
    <article>
      <span>2</span>
      <strong>Agregado</strong>
      <small>${state.items.length} archivo(s)</small>
      <p>${have.length} dato(s) marcados como listos.</p>
    </article>
    <article>
      <span>3</span>
      <strong>Podés sumar</strong>
      <small>${missing.length ? "Opcional" : "Completo"}</small>
      <p>${missing.length ? missing.map((entry) => escapeHtml(entry.label)).join(", ") : "La base principal ya está armada."}</p>
    </article>
    <article>
      <span>4</span>
      <strong>Resultado</strong>
      <small>${estimatePages()} páginas aprox.</small>
      <p>Documento completo y resumen listos para descargar.</p>
    </article>
  `;
}

function renderFinalSummary() {
  const panel = $("#finalSummary");
  if (!panel) return;
  const title = $("#caseTitle")?.value.trim() || state.caseType.exampleTitle;
  const haveCount = state.checklist.filter((entry) => entry.status === "have").length;
  panel.innerHTML = `
    <div>
      <span class="pill">${escapeHtml(state.caseType.title)}</span>
      <h4>Esto es lo que preparaste</h4>
      <p>${escapeHtml(title)}</p>
    </div>
    <div class="final-grid">
      <article>
        <strong>${state.items.length}</strong>
        <span>archivos agregados</span>
      </article>
      <article>
        <strong>${estimatePages()}</strong>
        <span>páginas estimadas</span>
      </article>
      <article>
        <strong>${haveCount}</strong>
        <span>datos marcados</span>
      </article>
    </div>
    <div class="final-includes">
      <p><strong>Documento completo:</strong> portada, resumen, índice, evidencias y línea temporal si agregaste fechas.</p>
      <p><strong>Resumen:</strong> una versión corta para enviar rápido por email, WhatsApp o formulario.</p>
    </div>
  `;
}

function renderReview() {
  const review = $("#reviewCard");
  if (!review) return;
  const haveCount = state.checklist.filter((entry) => entry.status === "have").length;
  const title = $("#caseTitle")?.value.trim() || state.caseType.exampleTitle;
  const summary = $("#caseSummary")?.value.trim() || state.caseType.summary;
  review.innerHTML = `
    <div>
      <span class="pill">${state.caseType.title}</span>
      <h4>${title}</h4>
      <p>${summary}</p>
    </div>
    <ul>
      <li>${state.items.length} archivo(s) agregado(s)</li>
      <li>${haveCount} dato(s) marcado(s)</li>
      <li>${estimatePages()} páginas estimadas</li>
      <li>Vista previa lista dentro de la web</li>
    </ul>
  `;
  renderCaseMap();
  renderFinalSummary();
}

function renderProtectedPreview() {
  if (!state.items.length) {
    showMessage("Subí al menos un archivo para crear la vista previa.", "warning");
    return;
  }
  const panel = $("#previewPanel");
  const items = sortedItems();
  const visibleItems = items.slice(0, 2);
  const lockedItems = items.slice(2);
  const title = $("#caseTitle").value.trim() || state.caseType.exampleTitle;
  const summary = $("#caseSummary").value.trim() || state.caseType.summary;
  const index = items
    .map((item, itemIndex) => `<li><span>Evidencia ${itemIndex + 1}</span><strong>${escapeHtml(item.title)}</strong></li>`)
    .join("");
  const visible = visibleItems
    .map((item, itemIndex) => {
      const media = item.previewUrl
        ? `<img src="${item.previewUrl}" alt="">`
        : `<div class="pdf-placeholder">Documento</div>`;
      return `
        <article class="preview-evidence">
          <span>Evidencia ${itemIndex + 1}</span>
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
          <span>Evidencia ${itemIndex + 3}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <em>Disponible en el documento completo</em>
        </article>
      `
    )
    .join("");

  panel.innerHTML = `
    <div class="preview-document">
      <div class="watermark">VISTA PREVIA</div>
      <section class="preview-cover">
        <span>PruebaPDF</span>
        <h4>${escapeHtml(title)}</h4>
        <p>${escapeHtml(summary)}</p>
      </section>
      <section class="preview-index">
        <h5>Índice</h5>
        <ol>${index}</ol>
      </section>
      ${renderTimelineHtml(true)}
      <section class="preview-evidence-list">
        ${visible}
        ${locked}
      </section>
    </div>
  `;
  state.previewReady = true;
  showMessage("Vista previa lista. Para descargar el documento completo usá un código de compra.", "success");
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
  return `<section class="${forPreview ? "preview-timeline" : "timeline-block"}"><h5>Línea temporal</h5><ol>${rows}</ol></section>`;
}

function renderShareKit() {
  const kit = $("#shareKit");
  if (!kit) return;
  const title = $("#caseTitle")?.value.trim() || state.caseType.exampleTitle;
  const summary = $("#caseSummary")?.value.trim() || state.caseType.summary;
  const party = $("#caseParty")?.value.trim();
  const reference = $("#caseReference")?.value.trim();
  const subject = `${title}${party ? ` - ${party}` : ""}`;
  const email = [
    `Hola,`,
    "",
    `Comparto documentación organizada sobre: ${title}.`,
    reference ? `Referencia: ${reference}.` : "",
    "",
    summary,
    "",
    "Adjunto el documento con resumen e evidencias ordenadas.",
    "",
    "Gracias."
  ]
    .filter(Boolean)
    .join("\n");
  const whatsapp = `Hola, te comparto la documentación organizada sobre "${title}". Incluye resumen y evidencias numeradas para revisar rápido.`;
  const form = `Caso: ${title}\n\nResumen:\n${summary}\n\nEvidencias incluidas: ${state.items.length}`;

  kit.innerHTML = `
    <div class="section-title small-title">
      <p class="eyebrow">Textos listos</p>
      <h3>Copiá y enviá sin pensar de más</h3>
    </div>
    ${copyBlock("Asunto de email", subject)}
    ${copyBlock("Email", email)}
    ${copyBlock("WhatsApp", whatsapp)}
    ${copyBlock("Texto para formulario", form)}
  `;
  kit.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy);
      showMessage("Texto copiado.", "success");
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

function copyBlock(label, text) {
  const extra =
    label === "WhatsApp"
      ? `<button type="button" data-whatsapp="${escapeAttribute(text)}">Abrir WhatsApp</button>`
      : label === "Email"
        ? `<button type="button" data-mail="1">Abrir email</button>`
        : "";
  return `
    <article class="copy-block">
      <strong>${label}</strong>
      <pre>${escapeHtml(text)}</pre>
      <div>
        <button type="button" data-copy="${escapeAttribute(text)}">Copiar</button>
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
  const cleaned = String(title || "PruebaPDF")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `${cleaned || "PruebaPDF"}-${suffix}.pdf`;
}

async function buildPdf({ mode = "full", watermark = false } = {}) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pageSize = [595.28, 841.89];
  let pageNumber = 1;
  const title = $("#caseTitle").value.trim() || state.caseType.exampleTitle;
  const summary = $("#caseSummary").value.trim() || state.caseType.summary;
  const party = $("#caseParty").value.trim();
  const reference = $("#caseReference").value.trim();
  const name = $("#caseName").value.trim();
  const date = $("#caseDate").value || todayLabel();
  const items = sortedItems();

  const drawFooter = (page) => {
    page.drawText(`Página ${pageNumber}`, { x: 500, y: 28, size: 9, font: regular, color: rgb(0.39, 0.43, 0.5) });
    if (watermark) {
      page.drawText("VISTA PREVIA", {
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
    page.drawText("PruebaPDF", { x: 52, y: 792, size: 11, font: bold, color: rgb(0.15, 0.31, 0.72) });
    page.drawText(heading, { x: 52, y: 752, size: 22, font: bold, color: rgb(0.04, 0.08, 0.14) });
  };

  const cover = pdf.addPage(pageSize);
  cover.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: rgb(0.96, 0.98, 1) });
  cover.drawRectangle({ x: 0, y: 0, width: 14, height: pageSize[1], color: rgb(0.15, 0.39, 0.92) });
  cover.drawText("PruebaPDF", { x: 52, y: 770, size: 18, font: bold, color: rgb(0.04, 0.08, 0.14) });
  cover.drawText("Documento organizado", { x: 52, y: 744, size: 11, font: regular, color: rgb(0.15, 0.31, 0.72) });
  wrapText(title, 26).slice(0, 3).forEach((line, index) => {
    cover.drawText(line, { x: 52, y: 655 - index * 40, size: 32, font: bold, color: rgb(0.04, 0.08, 0.14) });
  });
  let coverY = 510;
  coverY = drawParagraph(cover, summary, 52, coverY, 12, 72);
  coverY -= 24;
  [
    ["Tipo de caso", state.caseType.title],
    ["Fecha", date],
    ["Parte relacionada", party],
    ["Referencia", reference],
    ["Preparado por", name]
  ]
    .filter(([, value]) => value)
    .forEach(([label, value]) => {
      cover.drawText(label, { x: 52, y: coverY, size: 9, font: bold, color: rgb(0.39, 0.43, 0.5) });
      cover.drawText(String(value).slice(0, 70), { x: 170, y: coverY, size: 10, font: regular, color: rgb(0.13, 0.16, 0.22) });
      coverY -= 22;
    });
  drawFooter(cover);

  const summaryPage = pdf.addPage(pageSize);
  drawPageHeader(summaryPage, mode === "summary" ? "Resumen ejecutivo" : "Resumen del caso");
  let y = drawParagraph(summaryPage, summary, 52, 715, 12, 82);
  y -= 18;
  summaryPage.drawText("Checklist", { x: 52, y, size: 14, font: bold, color: rgb(0.04, 0.08, 0.14) });
  y -= 24;
  state.checklist.forEach((entry) => {
    const status = entry.status === "have" ? "Lo tengo" : entry.status === "missing" ? "No lo tengo" : "Lo agregaré después";
    summaryPage.drawText(`${status}: ${entry.label}`.slice(0, 94), { x: 64, y, size: 10, font: regular, color: rgb(0.13, 0.16, 0.22) });
    y -= 18;
  });
  drawFooter(summaryPage);

  const indexPage = pdf.addPage(pageSize);
  drawPageHeader(indexPage, "Índice de evidencias");
  let indexY = 708;
  items.forEach((item, index) => {
    indexPage.drawText(`Evidencia ${index + 1}`, { x: 52, y: indexY, size: 10, font: bold, color: rgb(0.15, 0.31, 0.72) });
    indexPage.drawText(item.title.slice(0, 58), { x: 145, y: indexY, size: 10, font: regular, color: rgb(0.13, 0.16, 0.22) });
    if (item.date) indexPage.drawText(item.date, { x: 470, y: indexY, size: 9, font: regular, color: rgb(0.39, 0.43, 0.5) });
    indexY -= 22;
  });
  drawFooter(indexPage);

  const dated = items.filter((item) => item.date).sort((a, b) => a.date.localeCompare(b.date));
  if (dated.length >= 2) {
    const timeline = pdf.addPage(pageSize);
    drawPageHeader(timeline, "Línea temporal");
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
    drawPageHeader(page, `Evidencia ${index + 1}`);
    page.drawText(item.title.slice(0, 80), { x: 52, y: 724, size: 15, font: bold, color: rgb(0.04, 0.08, 0.14) });
    page.drawText(item.type, { x: 52, y: 700, size: 10, font: regular, color: rgb(0.15, 0.31, 0.72) });
    if (item.date) {
      page.drawText(`Fecha: ${item.date}`, { x: 415, y: 700, size: 10, font: regular, color: rgb(0.39, 0.43, 0.5) });
    }
    const contentY = item.description ? drawParagraph(page, item.description, 52, 672, 10, 86) - 12 : 650;

    if (item.file.type === "application/pdf") {
      page.drawRectangle({ x: 52, y: contentY - 90, width: 490, height: 72, color: rgb(0.94, 0.96, 0.99) });
      page.drawText("Documento PDF adjunto en las páginas siguientes", {
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
  if (!state.items.length) {
    showMessage("Subí al menos un archivo para crear el documento.", "warning");
    return;
  }
  if (state.credits <= 0 || !state.token) {
    showMessage("Ingresá tu código para habilitar descargas.", "warning");
    return;
  }
  setBusy(true);
  showMessage("Preparando documento completo y resumen...", "note");
  try {
    const [fullBlob, summaryBlob] = await Promise.all([buildPdf({ mode: "full" }), buildPdf({ mode: "summary" })]);
    const consumeResponse = await fetch("/api/consume-credit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: state.token })
    });
    const consumeData = await consumeResponse.json();
    if (!consumeResponse.ok || !consumeData.ok) {
      showMessage(consumeData.message || "No pudimos descontar una descarga.", "warning");
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
    const title = $("#caseTitle").value.trim() || "PruebaPDF";
    downloadBlob(fullBlob, pdfSafeName(title, "documento-completo"));
    setTimeout(() => downloadBlob(summaryBlob, pdfSafeName(title, "resumen")), 500);
    showMessage(`Listo. Te quedan ${state.credits} descarga(s).`, "success");
    track("paid_download", { remainingCredits: state.credits });
  } catch (error) {
    console.error(error);
    showMessage("No pudimos generar el documento. Probá con archivos más livianos.", "warning");
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
    showMessage("Ingresá tu código de compra.", "warning");
    return;
  }
  syncCodeInputs(code);
  setBusy(true);
  showMessage("Validando código...", "note");
  try {
    const response = await fetch("/api/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      showMessage(data.message || "No pudimos validar el código.", "warning");
      return;
    }
    state.credits = Number(data.credits || 0);
    state.issuedCredits = Number(data.issuedCredits || data.credits || 0);
    state.token = String(data.token || "");
    saveCredits();
    updateCredits();
    showMessage(`Código validado. Tenés ${state.credits} descarga(s).`, "success");
    track("license_redeemed", { credits: state.credits, issuedCredits: state.issuedCredits });
  } catch {
    showMessage("No pudimos conectar con la validación online. Probá de nuevo en unos minutos.", "warning");
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
    state.lang = state.lang === "es" ? "en" : "es";
    applyTranslations();
  });
  $("#useTitleExample").addEventListener("click", () => {
    $("#caseTitle").value = state.caseType.exampleTitle;
    renderReview();
  });
  $("#fastModeButton")?.addEventListener("click", () => {
    state.fastMode = true;
    showStep(3);
    showMessage("Listo. Ahora agregá tus archivos.", "success");
    track("fast_mode_started");
  });
  $("#showMoreCases")?.addEventListener("click", () => {
    state.showAllCases = true;
    renderCases();
    track("show_more_cases");
  });
  ["caseTitle", "caseSummary", "caseDate", "caseParty", "caseReference", "caseName", "caseStatus"].forEach((id) => {
    const element = document.getElementById(id);
    element?.addEventListener("input", () => {
      state.previewReady = false;
      renderReview();
      renderCaseMap();
      renderFinalSummary();
      renderShareKit();
    });
  });
  $("#fileInput").addEventListener("change", (event) => {
    addFiles(event.target.files);
    event.target.value = "";
  });
  ["sortManual", "sortDate", "sortType"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
      state.sortMode = id.replace("sort", "").toLowerCase();
      renderItems();
      renderReview();
      renderCaseMap();
      renderFinalSummary();
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
  const status = $("#caseStatus");
  statuses.forEach((label) => {
    const option = document.createElement("option");
    option.value = label;
    option.textContent = label;
    status.appendChild(option);
  });
  selectCase(caseTypes[0]);
}

function init() {
  applyTranslations();
  initPrices();
  initFormDefaults();
  renderTones();
  renderSteps();
  bindEvents();
  loadCredits();
  updateCredits();
  refreshCreditStatus();
  showStep(0);
}

init();
