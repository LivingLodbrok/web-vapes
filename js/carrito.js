/* =====================================================================
   CARRITO DE PEDIDO  —  js/carrito.js
   ---------------------------------------------------------------------
   Acumula los arreglos completos que el cliente va eligiendo (combos y
   monoflorales, cada uno con su presentación y color), suma el total y
   genera el pedido completo para WhatsApp (principal) o Instagram.

   El estado vive solo en memoria del navegador (no se guarda nada en
   servidores; sin backend). El nombre y la dirección que escribe el
   cliente NUNCA se insertan como HTML: se mandan dentro de la URL con
   encodeURIComponent (WhatsApp) o se copian como texto plano (Instagram),
   por lo que no hay riesgo de inyección.
   ===================================================================== */

import { formatMXN, $, $$, esc } from "./formato.js";
import {
  construirMensajeCarrito,
  urlWhatsApp,
  urlInstagram,
  copiarAlPortapapeles,
} from "./conversion.js";
import { mostrarToast } from "./ui.js";

/* Líneas del pedido: { key, id, nombre, categoria, etiqueta, color, precio, cantidad } */
const items = [];

/* ------- API pública: agregar un arreglo configurado ------------- */
export function agregarAlCarrito(arreglo) {
  // Una "línea" es única por ramo + presentación + color.
  const key = `${arreglo.id}|${arreglo.etiqueta}|${arreglo.color}`;
  const existente = items.find((i) => i.key === key);
  if (existente) existente.cantidad += 1;
  else items.push({ key, cantidad: 1, ...arreglo });

  actualizarBadge();
  render();
  mostrarToast("Agregado a tu pedido 🛒");
}

/* ------- Cálculos -------------------------------------------------- */
const totalPiezas = () => items.reduce((s, i) => s + i.cantidad, 0);
const totalMXN = () => items.reduce((s, i) => s + i.precio * i.cantidad, 0);

/* ------- Badge del botón del carrito (contador) ------------------- */
function actualizarBadge() {
  const badge = $("#cartCount");
  const n = totalPiezas();
  badge.textContent = String(n);
  badge.hidden = n === 0;
}

/* ------- Render del contenido del carrito ------------------------- */
function render() {
  const cont = $("#cartItems");

  if (items.length === 0) {
    cont.innerHTML = `<p class="cart__vacio">Tu pedido está vacío.<br>Agrega un arreglo desde el catálogo 🌷</p>`;
  } else {
    cont.innerHTML = items
      .map(
        (i) => `
        <div class="citem" data-key="${esc(i.key)}">
          <div class="citem__info">
            <p class="citem__name">${esc(i.nombre)}</p>
            <p class="citem__meta">${esc(i.etiqueta)} · ${esc(i.color)}</p>
            <p class="citem__price">${formatMXN(i.precio)} c/u</p>
          </div>
          <div class="citem__actions">
            <div class="citem__qty">
              <button class="citem__btn" data-act="menos" aria-label="Quitar uno">−</button>
              <span aria-live="polite">${i.cantidad}</span>
              <button class="citem__btn" data-act="mas" aria-label="Agregar uno">+</button>
            </div>
            <button class="citem__del" data-act="del" aria-label="Eliminar ${esc(i.nombre)}">Eliminar</button>
          </div>
        </div>`
      )
      .join("");

    // Eventos de cada línea
    $$(".citem", cont).forEach((row) => {
      const key = row.dataset.key;
      row.querySelector('[data-act="menos"]').onclick = () => cambiarCantidad(key, -1);
      row.querySelector('[data-act="mas"]').onclick = () => cambiarCantidad(key, 1);
      row.querySelector('[data-act="del"]').onclick = () => eliminar(key);
    });
  }

  $("#cartTotal").textContent = formatMXN(totalMXN());
  validar();
}

function cambiarCantidad(key, delta) {
  const it = items.find((i) => i.key === key);
  if (!it) return;
  it.cantidad += delta;
  if (it.cantidad <= 0) eliminar(key);
  else {
    actualizarBadge();
    render();
  }
}

function eliminar(key) {
  const idx = items.findIndex((i) => i.key === key);
  if (idx >= 0) items.splice(idx, 1);
  actualizarBadge();
  render();
}

/* ------- Validación: hay items y hay nombre ----------------------- */
function datosCliente() {
  return {
    nombre: $("#cartNombre").value.trim(),
    direccion: $("#cartDireccion").value.trim(),
  };
}

function validar() {
  const { nombre } = datosCliente();
  const ok = items.length > 0 && nombre.length > 0;
  $("#cartWhats").disabled = !ok;
  $("#cartInsta").disabled = !ok;

  const hint = $("#cartHint");
  if (items.length === 0) hint.textContent = "Agrega al menos un arreglo.";
  else if (!nombre) hint.textContent = "Escribe tu nombre para continuar.";
  else hint.textContent = "";
  return ok;
}

/* ------- Disparos de conversión ----------------------------------- */
function pedirWhatsApp() {
  if (!validar()) return;
  const msg = construirMensajeCarrito(items, datosCliente());
  window.open(urlWhatsApp(msg), "_blank", "noopener");
}

async function pedirInstagram() {
  if (!validar()) return;
  const msg = construirMensajeCarrito(items, datosCliente());
  const ok = await copiarAlPortapapeles(msg);
  mostrarToast(
    ok
      ? "📋 Pedido copiado — pégalo en el DM de Instagram."
      : "No pudimos copiar. Copia tu pedido y pégalo en el DM."
  );
  setTimeout(() => window.open(urlInstagram(), "_blank", "noopener"), 900);
}

/* ------- Abrir / cerrar el panel del carrito ---------------------- */
let ultimoFoco = null;
function abrir() {
  ultimoFoco = document.activeElement;
  $("#cart").classList.add("open");
  $("#cart").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $("#cartNombre").focus();
}
function cerrar() {
  $("#cart").classList.remove("open");
  $("#cart").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (ultimoFoco) ultimoFoco.focus();
}

/* ------- Inicialización (una sola vez) ---------------------------- */
export function initCarrito() {
  $("#cartBtn").addEventListener("click", abrir);
  $$("[data-cart-close]").forEach((el) => el.addEventListener("click", cerrar));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $("#cart").classList.contains("open")) cerrar();
  });
  $("#cartNombre").addEventListener("input", validar);
  $("#cartWhats").addEventListener("click", pedirWhatsApp);
  $("#cartInsta").addEventListener("click", pedirInstagram);

  render();        // estado inicial (vacío)
  actualizarBadge();
}

/* Permite abrir el carrito desde otros módulos (ej. tras agregar) */
export function abrirCarrito() {
  abrir();
}
