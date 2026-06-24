const { PDFDocument, StandardFonts, degrees, rgb } = PDFLib;

const state = {
  items: [],
  credits: 0,
  issuedCredits: 0,
  token: ""
};

const config = window.PRUEBAPDF_CONFIG;
const $ = (selector) => document.querySelector(selector);
const itemsEl = $("#items");
const timelineEl = $("#timelineList");
const messageEl = $("#message");
const creditLabel = $("#creditLabel");

function formatMoney(value) {
  return `US$${Number(value).toFixed(2)}`;
}

function today() {
  return new Date().toLocaleDateString("es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function showMessage(text) {
  messageEl.hidden = !text;
  messageEl.textContent = text || "";
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
  creditLabel.textContent = `Créditos disponibles: ${state.credits}${total}`;
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

function renderTimeline() {
  const dated = state.items.filter((item) => item.date).sort((a, b) => a.date.localeCompare(b.date));
  if (!dated.length) {
    timelineEl.textContent = "Agregá fechas a los archivos para crearla automáticamente.";
    return;
  }

  timelineEl.innerHTML = "";
  dated.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = `${item.date} · ${item.file.name.slice(0, 32)}`;
    timelineEl.appendChild(span);
  });
}

function renderItems() {
  itemsEl.innerHTML = "";

  if (!state.items.length) {
    itemsEl.innerHTML = '<div class="empty">Tus archivos van a aparecer acá para ordenarlos y describirlos.</div>';
    renderTimeline();
    return;
  }

  state.items.forEach((item, index) => {
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
      thumb.textContent = "PDF";
    }

    const body = document.createElement("div");
    body.className = "item-body";
    const title = document.createElement("strong");
    title.textContent = `${index + 1}. ${item.file.name}`;
    const fields = document.createElement("div");
    fields.className = "item-fields";

    const date = document.createElement("input");
    date.type = "date";
    date.value = item.date;
    date.addEventListener("input", () => {
      item.date = date.value;
      renderTimeline();
    });

    const description = document.createElement("input");
    description.placeholder = "Descripción de esta evidencia";
    description.value = item.description;
    description.addEventListener("input", () => {
      item.description = description.value;
    });

    fields.append(date, description);
    body.append(title, fields);

    const tools = document.createElement("div");
    tools.className = "tool-buttons";
    [
      ["↑", () => moveItem(index, -1), "Subir archivo"],
      ["↓", () => moveItem(index, 1), "Bajar archivo"],
      ["×", () => removeItem(index), "Eliminar archivo"]
    ].forEach(([label, action, aria]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.setAttribute("aria-label", aria);
      button.addEventListener("click", action);
      tools.appendChild(button);
    });

    article.append(thumb, body, tools);
    itemsEl.appendChild(article);
  });

  renderTimeline();
}

function moveItem(index, direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= state.items.length) return;
  const next = [...state.items];
  [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
  state.items = next;
  renderItems();
}

function removeItem(index) {
  const [removed] = state.items.splice(index, 1);
  if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
  renderItems();
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

async function buildPdf(watermark) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pageSize = [595.28, 841.89];
  let pageNumber = 1;

  const drawFooter = (page) => {
    page.drawText(`Página ${pageNumber}`, {
      x: 500,
      y: 28,
      size: 9,
      font: regular,
      color: rgb(0.36, 0.38, 0.42)
    });
    if (watermark) {
      page.drawText("VISTA PREVIA", {
        x: 110,
        y: 360,
        size: 56,
        font: bold,
        color: rgb(0.84, 0.84, 0.84),
        rotate: degrees(35),
        opacity: 0.45
      });
    }
    pageNumber += 1;
  };

  const drawParagraph = (page, text, x, startY, size = 11, maxChars = 82) => {
    let y = startY;
    wrapText(text, maxChars).forEach((line) => {
      page.drawText(line, { x, y, size, font: regular, color: rgb(0.16, 0.18, 0.22) });
      y -= size + 6;
    });
    return y;
  };

  const details = {
    title: $("#caseTitle").value.trim() || "Documento organizado",
    name: $("#caseName").value.trim(),
    date: $("#caseDate").value || today(),
    summary:
      $("#caseSummary").value.trim() ||
      "Documento organizado automáticamente a partir de archivos cargados por el usuario."
  };

  const cover = pdf.addPage(pageSize);
  cover.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: rgb(0.97, 0.98, 0.98) });
  cover.drawText("PruebaPDF", { x: 52, y: 760, size: 16, font: bold, color: rgb(0.04, 0.09, 0.13) });
  cover.drawText(details.title.slice(0, 58), { x: 52, y: 660, size: 30, font: bold, color: rgb(0.04, 0.09, 0.13) });
  cover.drawText(`Fecha de creación: ${details.date}`, {
    x: 52,
    y: 608,
    size: 12,
    font: regular,
    color: rgb(0.25, 0.28, 0.32)
  });
  if (details.name) {
    cover.drawText(`Preparado por: ${details.name.slice(0, 70)}`, {
      x: 52,
      y: 585,
      size: 12,
      font: regular,
      color: rgb(0.25, 0.28, 0.32)
    });
  }
  drawParagraph(cover, details.summary, 52, 520, 12, 72);
  drawFooter(cover);

  const indexPage = pdf.addPage(pageSize);
  indexPage.drawText("Índice", { x: 52, y: 780, size: 22, font: bold, color: rgb(0.04, 0.09, 0.13) });
  let indexY = 738;
  state.items.forEach((item, index) => {
    indexPage.drawText(`${index + 1}. ${item.file.name}`.slice(0, 86), {
      x: 52,
      y: indexY,
      size: 11,
      font: regular,
      color: rgb(0.12, 0.15, 0.19)
    });
    if (item.date) {
      indexPage.drawText(item.date, { x: 460, y: indexY, size: 10, font: regular, color: rgb(0.36, 0.38, 0.42) });
    }
    indexY -= 22;
  });
  drawFooter(indexPage);

  const dated = state.items.filter((item) => item.date).sort((a, b) => a.date.localeCompare(b.date));
  if (dated.length) {
    const timeline = pdf.addPage(pageSize);
    timeline.drawText("Línea temporal", { x: 52, y: 780, size: 22, font: bold, color: rgb(0.04, 0.09, 0.13) });
    let y = 735;
    dated.forEach((item) => {
      timeline.drawCircle({ x: 63, y: y + 3, size: 4, color: rgb(0.11, 0.52, 0.49) });
      timeline.drawText(item.date, { x: 82, y, size: 11, font: bold, color: rgb(0.12, 0.15, 0.19) });
      timeline.drawText(item.file.name.slice(0, 68), {
        x: 170,
        y,
        size: 11,
        font: regular,
        color: rgb(0.12, 0.15, 0.19)
      });
      y -= 28;
    });
    drawFooter(timeline);
  }

  for (let index = 0; index < state.items.length; index += 1) {
    const item = state.items[index];
    const page = pdf.addPage(pageSize);
    page.drawText(`Evidencia ${index + 1}`, { x: 52, y: 780, size: 18, font: bold, color: rgb(0.04, 0.09, 0.13) });
    page.drawText(item.file.name.slice(0, 80), { x: 52, y: 754, size: 11, font: regular, color: rgb(0.25, 0.28, 0.32) });
    if (item.date) {
      page.drawText(`Fecha: ${item.date}`, { x: 52, y: 733, size: 10, font: regular, color: rgb(0.36, 0.38, 0.42) });
    }
    const afterTextY = item.description ? drawParagraph(page, item.description, 52, item.date ? 705 : 725, 10, 84) : item.date ? 705 : 725;

    if (item.file.type === "application/pdf") {
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
      const maxHeight = Math.max(280, afterTextY - 80);
      const scale = Math.min(maxWidth / dims.width, maxHeight / dims.height, 1);
      const width = dims.width * scale;
      const height = dims.height * scale;
      page.drawImage(image, {
        x: 52 + (maxWidth - width) / 2,
        y: 60,
        width,
        height
      });
      drawFooter(page);
    }
  }

  return new Blob([await pdf.save()], { type: "application/pdf" });
}

async function downloadPdf(watermark) {
  if (!state.items.length) {
    showMessage("Subí al menos un archivo para crear el PDF.");
    return;
  }

  if (!watermark && state.credits <= 0) {
    showMessage("Ingresá un código de compra o usá un crédito disponible.");
    return;
  }

  if (!watermark && !state.token) {
    showMessage("Volvé a ingresar tu license key para descargar el PDF limpio.");
    return;
  }

  setBusy(true);
  showMessage("");
  try {
    const blob = await buildPdf(watermark);
    if (!watermark) {
      const consumeResponse = await fetch("/api/consume-credit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: state.token })
      });
      const consumeData = await consumeResponse.json();
      if (!consumeResponse.ok || !consumeData.ok) {
        showMessage(consumeData.message || "No pudimos descontar el crédito.");
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
    }

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const title = $("#caseTitle").value.trim() || "PruebaPDF";
    anchor.href = url;
    anchor.download = `${title.replace(/[^\w-]+/g, "-")}${watermark ? "-vista-previa" : ""}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    showMessage("No pudimos generar el PDF. Probá con archivos más livianos o en otro navegador.");
  } finally {
    setBusy(false);
  }
}

function setBusy(isBusy) {
  ["previewButton", "cleanButton", "redeemButton"].forEach((id) => {
    document.getElementById(id).disabled = isBusy;
  });
}

async function redeemCode() {
  const code = $("#purchaseCode").value.trim();
  if (!code) {
    showMessage("Ingresá tu código de compra.");
    return;
  }

  setBusy(true);
  showMessage("");
  try {
    const response = await fetch("/api/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const data = await response.json();
    if (!response.ok || !data.ok) {
      showMessage(data.message || "No pudimos validar el código.");
      return;
    }
    state.credits = Number(data.credits || 0);
    state.issuedCredits = Number(data.issuedCredits || data.credits || 0);
    state.token = String(data.token || "");
    saveCredits();
    updateCredits();
    showMessage(`License key validada. Tenés ${state.credits} descarga(s) limpia(s).`);
  } catch {
    showMessage("No pudimos conectar con la validación online. Probá de nuevo en unos minutos.");
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

function addFiles(files) {
  const supported = Array.from(files).filter((file) =>
    ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type)
  );

  supported.forEach((file) => {
    state.items.push({
      id: crypto.randomUUID(),
      file,
      previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
      description: "",
      date: ""
    });
  });

  renderItems();
}

function initPrices() {
  $("#priceSingle").textContent = formatMoney(config.prices.singleUsd);
  $("#pricePack5").textContent = formatMoney(config.prices.pack5Usd);
  $("#pricePack20").textContent = formatMoney(config.prices.pack20Usd);
  $("#paySingle").href = config.paymentLinks.single;
  $("#payPack5").href = config.paymentLinks.pack5;
  $("#payPack20").href = config.paymentLinks.pack20;
}

function init() {
  loadCredits();
  updateCredits();
  refreshCreditStatus();
  initPrices();
  renderItems();

  $("#fileInput").addEventListener("change", (event) => {
    addFiles(event.target.files);
    event.target.value = "";
  });
  $("#previewButton").addEventListener("click", () => downloadPdf(true));
  $("#cleanButton").addEventListener("click", () => downloadPdf(false));
  $("#redeemButton").addEventListener("click", redeemCode);
  $("#shareButton").addEventListener("click", async () => {
    if (navigator.share) {
      await navigator.share({ title: "PruebaPDF", url: location.href });
    } else {
      await navigator.clipboard.writeText(location.href);
      showMessage("Link copiado.");
    }
  });
}

init();
