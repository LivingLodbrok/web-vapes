/* =====================================================================
   HELPERS DE FORMATO Y DOM  —  js/formato.js
   ===================================================================== */

// Moneda mexicana con Intl (es-MX). Ej.: 420 -> "$420.00"
const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatMXN = (n) => mxn.format(n);

// Atajos de selección
export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// Escapa texto para insertarlo de forma segura en HTML (evita romper el markup)
export function esc(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Estrellas llenas/vacías para reseñas
export const estrellas = (n) => "★".repeat(n) + "☆".repeat(5 - n);
