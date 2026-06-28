/* =====================================================================
   CATÁLOGO — VZZVAPEZZ — data/catalogo.js
   ---------------------------------------------------------------------
   Cada producto tiene "opciones" (presentaciones) con PRECIO FIJO.
   El cliente elige una presentación + una variante (sabor o color).

   👉 PRECIOS: por ahora están en `null` y la web muestra "A confirmar".
      Cambia cada `precio: null` por el número real (ej. precio: 250).

   Modelo:
     id           -> identificador único, sin espacios
     nombre       -> nombre del producto
     categoria    -> "Desechables" | "Pods recargables" | "Líquidos"
     descripcion  -> frase corta de venta
     imagen       -> ruta de la foto (assets/)
     opciones     -> presentaciones: { etiqueta, precio } (precio en MXN o null)
     ejeEtiqueta  -> rótulo de la variante: "Sabor" | "Color" | "Versión"
     colores      -> variantes disponibles (sabores o colores) (array de textos)
     nota         -> (opcional) aclaración
     cotizable    -> (opcional) true => muestra "cotiza cantidades mayores"
     destacado    -> true => insignia "Destacado"
   ===================================================================== */

export const CATALOGO = [
  /* ================= DESECHABLES ================= */
  {
    id: "desechable-colores",
    nombre: "Vape Desechable",
    categoria: "Desechables",
    descripcion: "Listo para usar, sin recargas. Cinco colores, puro estilo.",
    imagen: "assets/desechables-colores.jpg",
    opciones: [{ etiqueta: "1 unidad", precio: null }],
    ejeEtiqueta: "Color",
    colores: ["Azul", "Verde", "Naranja", "Rosa", "Negro"],
    cotizable: true,
    destacado: true,
  },
  {
    id: "desechable-slim",
    nombre: "Vape Desechable Slim",
    categoria: "Desechables",
    descripcion: "Ultra delgado y discreto. Cabe en cualquier bolsillo.",
    imagen: "assets/disp-pen-plata.jpg",
    opciones: [{ etiqueta: "1 unidad", precio: null }],
    ejeEtiqueta: "Sabor",
    colores: ["Mango Sunrise", "Berry Bliss", "Minty Fresh", "Cool Grape", "Citrus Chill"],
    cotizable: true,
  },

  /* ================= PODS RECARGABLES ================= */
  {
    id: "pod-recargable",
    nombre: "Pod Recargable",
    categoria: "Pods recargables",
    descripcion: "Recargable y compacto. Ahorra y reduce desperdicio.",
    imagen: "assets/pod-jet-black.jpg",
    opciones: [{ etiqueta: "1 unidad", precio: null }],
    ejeEtiqueta: "Color",
    colores: ["Negro"],
  },
  {
    id: "kit-pod-avanzado",
    nombre: "Kit Pod Avanzado",
    categoria: "Pods recargables",
    descripcion: "Pantalla, control de temperatura y batería para todo el día.",
    imagen: "assets/kpod-hybrid-3.jpg",
    opciones: [{ etiqueta: "1 unidad", precio: null }],
    ejeEtiqueta: "Color",
    colores: ["Plata", "Negro"],
    destacado: true,
  },
  {
    id: "mod-40w",
    nombre: "Mod 40W",
    categoria: "Pods recargables",
    descripcion: "40W de potencia para quienes buscan nubes densas.",
    imagen: "assets/kpod-40w.jpg",
    opciones: [{ etiqueta: "1 unidad", precio: null }],
    ejeEtiqueta: "Color",
    colores: ["Grafito"],
  },

  /* ================= LÍQUIDOS ================= */
  {
    id: "liquido-30ml",
    nombre: "E-Liquid 30 ml",
    categoria: "Líquidos",
    descripcion: "Líquido premium de 30 ml. Elige tu sabor y nivel de nicotina.",
    imagen: "assets/liquido-red-berries.jpg",
    opciones: [
      { etiqueta: "30 ml · 3 mg", precio: null },
      { etiqueta: "30 ml · 6 mg", precio: null },
    ],
    ejeEtiqueta: "Sabor",
    colores: ["Frosted Red Berries", "Mango Rush", "Mint Frost", "Citrus Chill", "Tobacco Blend"],
  },
  {
    id: "cartuchos-prellenados",
    nombre: "Cartuchos Pre-llenados",
    categoria: "Líquidos",
    descripcion: "Cambio rápido, cero relleno. Pack de 4 sabores.",
    imagen: "assets/cartuchos-sabores.jpg",
    opciones: [{ etiqueta: "Pack 4 cartuchos", precio: null }],
    ejeEtiqueta: "Sabor",
    colores: ["Mango Sunrise", "Berry Bliss", "Minty Fresh", "Cool Grape"],
  },
  {
    id: "pack-discovery",
    nombre: "Pack Discovery",
    categoria: "Líquidos",
    descripcion: "6 sabores para descubrir tu favorito.",
    imagen: "assets/liquidos-discovery.jpg",
    opciones: [{ etiqueta: "Pack 6 botellas", precio: null }],
    ejeEtiqueta: "Sabor",
    colores: ["Surtido (6 sabores)"],
    destacado: true,
  },
];

/* Mapa variante -> HEX para pintar los swatches. Clave en minúsculas. */
export const COLOR_HEX = {
  // Sabores
  "mango sunrise": "#F2A65A",
  "mango rush": "#F2994A",
  "berry bliss": "#A24BCF",
  "minty fresh": "#3FD9A0",
  "mint frost": "#7FE9C3",
  "cool grape": "#8E6CC8",
  "citrus chill": "#E6D34A",
  "frosted red berries": "#E0455E",
  "tobacco blend": "#9A6B3F",
  "surtido (6 sabores)": "#A78BFA",
  // Colores de dispositivo
  "azul": "#3B82F6",
  "verde": "#22C55E",
  "naranja": "#F97316",
  "rosa": "#EC4899",
  "negro": "#222233",
  "plata": "#C7CBD6",
  "grafito": "#5A5F70",
};
