/* =====================================================================
   FLUJO DE CONVERSIÓN  —  js/conversion.js
   Construye el mensaje del pedido y los dos disparos: WhatsApp / Instagram.
   ---------------------------------------------------------------------
   👉 El número de WhatsApp y el usuario de Instagram se editan en
      data/negocio.js (NO aquí).
   ===================================================================== */

import { NEGOCIO } from "../data/negocio.js";
import { formatMXN } from "./formato.js";

/* Construye el texto del pedido a partir del estado del configurador.
   Se usa tanto para WhatsApp como para copiar al portapapeles (Instagram). */
export function construirMensaje(pedido) {
  const { flor, opcion, color } = pedido;
  return (
    `Hola ${NEGOCIO.nombre} 👋 Quiero hacer un pedido:\n` +
    `• Producto: ${flor.nombre} (${flor.categoria})\n` +
    `• Presentación: ${opcion.etiqueta}\n` +
    `• Sabor: ${color}\n` +
    `• Estimado: ${formatMXN(opcion.precio)}\n` +
    `¿Me confirman disponibilidad y entrega?`
  );
}

/* Construye el mensaje de un PEDIDO COMPLETO (carrito con varios arreglos).
   `items` = [{ nombre, categoria, etiqueta, color, precio, cantidad }]
   `datos` = { nombre, direccion } capturados en el carrito.
   Sale limpio, con saltos de línea y emojis. */
export function construirMensajeCarrito(items, datos = {}) {
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0);

  let msg = `¡Hola ${NEGOCIO.nombre}! 👋 Me gustaría hacer el siguiente pedido:\n\n`;

  items.forEach((i) => {
    msg += `🛒 ${i.cantidad}x ${i.nombre} (${i.categoria})\n`;
    msg += `   • Presentación: ${i.etiqueta}\n`;
    msg += `   • Sabor: ${i.color}\n`;
    msg += `   • ${formatMXN(i.precio)}${i.cantidad > 1 ? " c/u" : ""}\n\n`;
  });

  msg += `🧾 Total estimado: ${formatMXN(total)}\n\n`;
  if (datos.nombre) msg += `Nombre: ${datos.nombre}\n`;
  if (datos.direccion) msg += `Dirección de entrega: ${datos.direccion}\n`;
  msg += `\n¿Me confirman disponibilidad y entrega? 🙌`;

  return msg;
}

/* --- WhatsApp (canal principal) ----------------------------------- */
export function urlWhatsApp(mensaje) {
  const num = NEGOCIO.whatsapp.replace(/\D/g, ""); // solo dígitos
  return `https://wa.me/${num}?text=${encodeURIComponent(mensaje)}`;
}

/* --- Instagram (canal secundario) ---------------------------------
   LIMITACIÓN REAL: Instagram NO permite prellenar el texto de un DM
   mediante un link. Para automatizar el envío del DM se necesitaría la
   Graph API de Instagram + un backend autenticado, lo cual queda FUERA
   del alcance de este sitio estático.
   Estrategia usada: copiamos el resumen al portapapeles y abrimos el DM
   para que el cliente solo lo pegue. -------------------------------- */
export function urlInstagram() {
  const user = NEGOCIO.instagram.replace(/^@/, "");
  return `https://ig.me/m/${user}`; // bandeja de DM (cae al perfil si no aplica)
}

/* Copia robusta al portapapeles. Devuelve true/false según resultado,
   con fallback para navegadores que bloquean la Clipboard API. */
export async function copiarAlPortapapeles(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (_) {
    // Fallback clásico con textarea oculto
    try {
      const ta = document.createElement("textarea");
      ta.value = texto;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }
}
