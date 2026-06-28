/* =====================================================================
   UI COMPARTIDA  —  js/ui.js
   Toast, render de secciones de contenido y comportamiento del navbar.
   ===================================================================== */

import { NEGOCIO } from "../data/negocio.js";
import { RESENAS } from "../data/resenas.js";
import { urlWhatsApp } from "./conversion.js";
import { $, $$, esc, estrellas } from "./formato.js";

/* ---------- Toast accesible (aria-live) ---------- */
let toastTimer;
export function mostrarToast(texto) {
  const t = $("#toast");
  t.textContent = texto;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3800);
}

/* ---------- Inyecta textos editables del negocio ---------- */
export function pintarNegocio() {
  $$("[data-nombre]").forEach((el) => (el.textContent = NEGOCIO.nombre));
  $$("[data-eslogan]").forEach((el) => (el.textContent = NEGOCIO.eslogan));

  $("#nosHistoria").textContent = NEGOCIO.historia;
  $("#nosPropuesta").textContent = NEGOCIO.propuestaValor;
  $("#nosFoto").src = NEGOCIO.fotoNosotros;

  $("#footTel").textContent = NEGOCIO.telefono;
  // El correo solo se muestra si existe (aún no lo tienen)
  if (NEGOCIO.correo) $("#footMail").textContent = NEGOCIO.correo;
  else $("#footMail").hidden = true;
  $("#footHorario").textContent = NEGOCIO.horario;
  $("#footUbicacion").textContent = NEGOCIO.ubicacion;
  $("#footCiudad").textContent = NEGOCIO.ciudad;
  $("#footAviso").textContent = NEGOCIO.aviso || "";
  $("#year").textContent = new Date().getFullYear();

  // Enlaces de contacto genéricos (hero, header, footer, FAB)
  const waGenerico = urlWhatsApp(
    `Hola ${NEGOCIO.nombre} 🌷 Me interesa pedir un ramo. ¿Me ayudan?`
  );
  $$("[data-wa-link]").forEach((a) => (a.href = waGenerico));
  $$("[data-ig-link]").forEach(
    (a) => (a.href = `https://instagram.com/${NEGOCIO.instagram}`)
  );
  $$("[data-tt-link]").forEach(
    (a) => (a.href = `https://tiktok.com/@${NEGOCIO.tiktok}`)
  );
}

/* ---------- Reseñas ---------- */
export function pintarResenas() {
  const grid = $("#resenasGrid");
  grid.innerHTML = RESENAS.map((r) => {
    const avatar = r.foto
      ? `<img class="resena__avatar" src="${esc(r.foto)}" alt="Foto de ${esc(r.nombre)}" loading="lazy" />`
      : `<div class="resena__avatar resena__avatar--ph" aria-hidden="true">${esc(r.nombre.charAt(0))}</div>`;
    return `
      <figure class="resena">
        <div class="resena__stars" aria-label="Calificación: ${r.estrellas} de 5 estrellas">${estrellas(r.estrellas)}</div>
        <blockquote class="resena__text">“${esc(r.comentario)}”</blockquote>
        <figcaption class="resena__person">
          ${avatar}<span class="resena__name">${esc(r.nombre)}</span>
        </figcaption>
      </figure>`;
  }).join("");
}

/* ---------- Navbar: menú móvil + sombra al hacer scroll ---------- */
export function initNavbar() {
  const links = $("#navLinks");
  $("#navToggle").addEventListener("click", () => {
    const abierto = links.classList.toggle("open");
    $("#navToggle").setAttribute("aria-expanded", String(abierto));
  });
  $$("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
  window.addEventListener("scroll", () => {
    $("#nav").classList.toggle("nav--scrolled", window.scrollY > 20);
  });
}
