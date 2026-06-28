/* =====================================================================
   CONFIGURADOR DE PEDIDO  —  js/configurador.js   (núcleo del proyecto)
   ---------------------------------------------------------------------
   Reglas (modelo Fellie: precio FIJO por presentación):
   • El cliente elige UNA presentación (tamaño/paquete) con su precio.
   • El cliente elige UN color de la lista propia del ramo (swatches).
   • Subtotal = precio de la presentación elegida (NO se multiplica).
   • Botón bloqueado hasta que presentación y color sean válidos.
   • Preview en vivo del mensaje (elemento "firma" del sitio).
   ===================================================================== */

import { CATALOGO, COLOR_HEX } from "../data/catalogo.js";
import { formatMXN, $, $$, esc } from "./formato.js";
import { agregarAlCarrito } from "./carrito.js";

/* Estado del pedido en curso (vive solo en el cliente) */
const pedido = { flor: null, opcion: null, color: null };

const modal = () => $("#modal");

/* ------- Apertura: carga el ramo y construye los controles --------- */
export function abrirConfigurador(id) {
  const flor = CATALOGO.find((f) => f.id === id);
  if (!flor) return;

  // Presentación: por defecto la primera (suele ser la más económica).
  // Color: se preselecciona solo si el ramo tiene un único color.
  pedido.flor = flor;
  pedido.opcion = flor.opciones[0];
  pedido.color = flor.colores.length === 1 ? flor.colores[0] : null;

  // Cabecera
  $("#cfgImg").src = flor.imagen;
  $("#cfgImg").alt = flor.nombre;
  $("#cfgTipo").textContent = flor.categoria;
  $("#cfgNombre").textContent = flor.nombre;
  $("#cfgDesc").textContent = flor.descripcion;
  // Rótulo de la variante (Sabor para líquidos/desechables, Color para dispositivos)
  $("#lblColor").textContent = flor.ejeEtiqueta || "Sabor";

  // "Incluye" (solo mixtos) y aclaración de colores (nota)
  const incluye = $("#cfgIncluye");
  if (flor.incluye && flor.incluye.length) {
    incluye.hidden = false;
    incluye.innerHTML =
      `<span class="cfg__incluye-cap">Incluye:</span> ` +
      flor.incluye.map((x) => `<span class="tagx">${esc(x)}</span>`).join("");
  } else {
    incluye.hidden = true;
  }

  pintarOpciones(flor);
  pintarSwatches(flor);
  refrescar();
  abrirModal();
}

/* ------- Selector de PRESENTACIÓN (precio fijo) ------------------- */
function pintarOpciones(flor) {
  const cont = $("#cfgOpciones");
  cont.innerHTML = flor.opciones
    .map(
      (o, i) => `
      <button class="opcion ${o === pedido.opcion ? "selected" : ""}"
              data-i="${i}" role="radio" aria-checked="${o === pedido.opcion}">
        <span class="opcion__et">${esc(o.etiqueta)}</span>
        <span class="opcion__precio">${formatMXN(o.precio)}</span>
      </button>`
    )
    .join("");

  $$(".opcion", cont).forEach((b) => {
    b.addEventListener("click", () => {
      pedido.opcion = flor.opciones[Number(b.dataset.i)];
      $$(".opcion", cont).forEach((x) => {
        x.classList.remove("selected");
        x.setAttribute("aria-checked", "false");
      });
      b.classList.add("selected");
      b.setAttribute("aria-checked", "true");
      refrescar();
    });
  });

  // Nota de cotización (monoflorales) y aclaración de colores
  $("#cfgCotiza").hidden = !flor.cotizable;
}

/* ------- Swatches de color (chip de color + nombre) --------------- */
function pintarSwatches(flor) {
  const cont = $("#cfgColores");
  cont.innerHTML = flor.colores
    .map((nombre) => {
      const hex = COLOR_HEX[nombre.toLowerCase()] || "#cccccc";
      const sel = nombre === pedido.color ? "selected" : "";
      return `
        <button class="swatch ${sel}" data-color="${esc(nombre)}" role="radio"
                aria-checked="${nombre === pedido.color}" aria-label="Color ${esc(nombre)}">
          <span class="swatch__dot" style="background:${esc(hex)}"></span>
          <span class="swatch__txt">${esc(nombre)}</span>
        </button>`;
    })
    .join("");

  $$(".swatch", cont).forEach((sw) => {
    sw.addEventListener("click", () => {
      pedido.color = sw.dataset.color;
      $$(".swatch", cont).forEach((s) => {
        s.classList.remove("selected");
        s.setAttribute("aria-checked", "false");
      });
      sw.classList.add("selected");
      sw.setAttribute("aria-checked", "true");
      refrescar();
    });
  });

  // Nota de colores por componente (si existe)
  const nota = $("#cfgNotaColor");
  if (flor.nota) {
    nota.hidden = false;
    nota.textContent = flor.nota;
  } else {
    nota.hidden = true;
  }
}

/* ------- Validación + subtotal + preview (en vivo) ---------------- */
function esValido() {
  return pedido.flor && pedido.opcion && pedido.color !== null;
}

function refrescar() {
  // Precio estimado = precio fijo de la presentación elegida
  $("#cfgSubtotal").textContent = formatMXN(pedido.opcion.precio);

  // Resumen en vivo de la selección (la "firma" del sitio)
  const eje = (pedido.flor.ejeEtiqueta || "Sabor").toLowerCase();
  $("#cfgPreview").textContent = pedido.color
    ? `${pedido.flor.nombre} · ${pedido.opcion.etiqueta} · ${pedido.color} — ${formatMXN(pedido.opcion.precio)}`
    : `Selecciona un ${eje} para completar tu pedido…`;

  // Validación del botón "Agregar al pedido"
  const btn = $("#cfgSolicitar");
  const hint = $("#cfgHint");
  if (esValido()) {
    btn.disabled = false;
    hint.textContent = "";
  } else {
    btn.disabled = true;
    hint.textContent = !pedido.color
      ? `Falta elegir un ${(pedido.flor.ejeEtiqueta || "Sabor").toLowerCase()} 👇`
      : "Elige una presentación.";
  }
}

/* ------- Agregar el arreglo configurado al carrito ---------------- */
function agregar() {
  if (!esValido()) return;
  agregarAlCarrito({
    id: pedido.flor.id,
    nombre: pedido.flor.nombre,
    categoria: pedido.flor.categoria,
    etiqueta: pedido.opcion.etiqueta,
    color: pedido.color,
    precio: pedido.opcion.precio,
  });
  cerrarModal(); // el toast "Agregado a tu pedido 🛒" lo muestra el carrito
}

/* ------- Modal: abrir / cerrar (con accesibilidad) ---------------- */
let ultimoFoco = null;
function abrirModal() {
  ultimoFoco = document.activeElement;
  modal().classList.add("open");
  modal().setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function cerrarModal() {
  modal().classList.remove("open");
  modal().setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (ultimoFoco) ultimoFoco.focus();
}

/* ------- Conexión de eventos del configurador (una sola vez) ------- */
export function initConfigurador() {
  $$("[data-close]").forEach((el) => el.addEventListener("click", cerrarModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal().classList.contains("open")) cerrarModal();
  });
  $("#cfgSolicitar").addEventListener("click", agregar);
}
