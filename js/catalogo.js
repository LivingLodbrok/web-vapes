/* =====================================================================
   CATÁLOGO  —  js/catalogo.js
   Renderiza el grid de tarjetas y el filtro por categoría.
   ===================================================================== */

import { CATALOGO } from "../data/catalogo.js";
import { formatMXN, $, $$, esc } from "./formato.js";

/* Precio "desde": la presentación más barata con precio definido (o null) */
const precioDesde = (f) => {
  const validos = f.opciones.map((o) => o.precio).filter(Number.isFinite);
  return validos.length ? Math.min(...validos) : null;
};

/* Texto de variante: "5 sabores" / "2 colores"; se omite si solo hay una */
function varianteTexto(f) {
  const n = f.colores.length;
  if (n <= 1) return "";
  const eje = (f.ejeEtiqueta || "Sabor").toLowerCase();
  const plural = eje === "color" ? "colores" : eje === "sabor" ? "sabores" : eje + "s";
  return ` · ${n} ${plural}`;
}

/* Tarjeta individual del catálogo */
function tarjetaHTML(f) {
  const insignia = f.destacado
    ? `<span class="card__badge card__badge--star">★ Destacado</span>`
    : `<span class="card__badge">${esc(f.categoria)}</span>`;
  const desde = precioDesde(f);
  const precioHTML =
    desde !== null
      ? `Desde <strong>${formatMXN(desde)}</strong>`
      : `<strong>A confirmar</strong>`;
  return `
    <article class="card" data-id="${esc(f.id)}" tabindex="0" role="button"
             aria-label="Configurar ${esc(f.nombre)}">
      <div class="card__media">
        ${insignia}
        <img src="${esc(f.imagen)}" alt="${esc(f.nombre)}: ${esc(f.descripcion)}" loading="lazy" />
      </div>
      <div class="card__body">
        <h3 class="card__name">${esc(f.nombre)}</h3>
        <p class="card__type">${esc(f.categoria)}${varianteTexto(f)}</p>
        <p class="card__desc">${esc(f.descripcion)}</p>
        <div class="card__foot">
          <span class="card__price">${precioHTML}</span>
          <span class="card__cta">Configurar →</span>
        </div>
      </div>
    </article>`;
}

/* Chips de filtro por categoría (Todos / Monoflorales / Mixtos) */
function pintarFiltros(onFiltrar) {
  const cont = $("#catalogoFiltros");
  const cats = ["Todos", ...new Set(CATALOGO.map((f) => f.categoria))];
  cont.innerHTML = cats
    .map(
      (t, i) =>
        `<button class="chip ${i === 0 ? "chip--on" : ""}" data-cat="${esc(t)}"
                 aria-pressed="${i === 0}">${esc(t)}</button>`
    )
    .join("");

  $$(".chip", cont).forEach((chip) => {
    chip.addEventListener("click", () => {
      $$(".chip", cont).forEach((c) => {
        c.classList.remove("chip--on");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("chip--on");
      chip.setAttribute("aria-pressed", "true");
      onFiltrar(chip.dataset.cat);
    });
  });
}

/* Render del grid. `onAbrir(id)` se llama al elegir una tarjeta. */
export function renderCatalogo(onAbrir) {
  const grid = $("#catalogoGrid");

  const pintar = (cat = "Todos") => {
    const lista =
      cat === "Todos" ? CATALOGO : CATALOGO.filter((f) => f.categoria === cat);

    // Robustez: catálogo vacío con mensaje claro
    if (lista.length === 0) {
      grid.innerHTML = `<p class="catalogo__vacio">Pronto añadiremos más productos a esta categoría 💨</p>`;
      return;
    }

    grid.innerHTML = lista.map(tarjetaHTML).join("");

    // Abrir configurador con clic o teclado (Enter / Espacio)
    $$(".card", grid).forEach((card) => {
      const abrir = () => onAbrir(card.dataset.id);
      card.addEventListener("click", abrir);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          abrir();
        }
      });
    });
  };

  pintarFiltros(pintar);
  pintar(); // estado inicial: Todos
}
