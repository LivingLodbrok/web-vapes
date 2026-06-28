/* =====================================================================
   ENTRY POINT  —  js/main.js
   Orquesta el arranque del sitio. Importa los módulos y los conecta.
   ===================================================================== */

import { renderCatalogo } from "./catalogo.js";
import { abrirConfigurador, initConfigurador } from "./configurador.js";
import { initCarrito } from "./carrito.js";
import { pintarNegocio, pintarResenas, initNavbar } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  pintarNegocio();                 // textos y enlaces editables
  pintarResenas();                 // testimonios
  renderCatalogo(abrirConfigurador); // grid + filtro; al elegir, abre el configurador
  initConfigurador();              // eventos del modal/configurador
  initCarrito();                   // carrito de pedido + checkout
  initNavbar();                    // menú móvil + scroll
});
