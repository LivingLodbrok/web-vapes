/* =====================================================================
   CATÁLOGO DE RAMOS — FELLIE FLORERÍA — data/catalogo.js
   ---------------------------------------------------------------------
   Datos reales tomados del catálogo 2026.
   Los precios NO se multiplican: cada ramo tiene "presentaciones"
   (tamaños o paquetes) con su PRECIO FIJO. El cliente elige una
   presentación + un color.

   👉 PARA AGREGAR / EDITAR UN RAMO: copia un objeto y cambia sus campos.

   Modelo:
     id          -> identificador único, sin espacios
     nombre      -> nombre del ramo
     categoria   -> "Monoflorales" | "Mixtos" (define el filtro)
     descripcion -> frase corta de venta
     incluye     -> (opcional) qué trae el arreglo (array de textos)
     imagen      -> ruta de la foto real
     opciones    -> presentaciones: { etiqueta, precio } (precio FIJO en MXN)
     colores     -> colores disponibles para ese ramo (array de textos)
     nota        -> (opcional) aclaración de colores por componente
     cotizable   -> (opcional) true => muestra "cotiza cantidades mayores"
     destacado   -> true => insignia "Destacado"
   ===================================================================== */

export const CATALOGO = [
  /* ============== MONOFLORALES ============== */
  {
    id: "margaritas",
    nombre: "Margaritas",
    categoria: "Monoflorales",
    descripcion: "Margaritas frescas, alegres y delicadas, envueltas a mano.",
    imagen: "assets/pag04.jpg",
    opciones: [
      { etiqueta: "S", precio: 400 },
      { etiqueta: "M", precio: 800 },
      { etiqueta: "L", precio: 1200 },
      { etiqueta: "XL", precio: 1600 },
    ],
    colores: ["Rosa", "Blanco", "Fucsia", "Naranja", "Morado", "Amarillo", "Verde", "Vino"],
    cotizable: true,
  },
  {
    id: "claveles",
    nombre: "Claveles",
    categoria: "Monoflorales",
    descripcion: "Claveles de pétalos abundantes y gran duración.",
    imagen: "assets/pag05.jpg",
    opciones: [
      { etiqueta: "S", precio: 450 },
      { etiqueta: "M", precio: 900 },
      { etiqueta: "L", precio: 1350 },
      { etiqueta: "XL", precio: 1800 },
    ],
    colores: ["Rosa", "Blanco", "Fucsia", "Naranja", "Rojo", "Morado", "Amarillo"],
    cotizable: true,
  },
  {
    id: "mini-rosas",
    nombre: "Mini Rosas",
    categoria: "Monoflorales",
    descripcion: "Ramos voluminosos de mini rosas para un detalle de impacto.",
    imagen: "assets/pag06.jpg",
    opciones: [
      { etiqueta: "S · 50 aprox", precio: 600 },
      { etiqueta: "M · 100 aprox", precio: 1150 },
      { etiqueta: "L · 150 aprox", precio: 1700 },
      { etiqueta: "XL · 200 aprox", precio: 2300 },
    ],
    colores: ["Rosa", "Rosa claro", "Blanco", "Fucsia", "Naranja", "Rojo"],
    cotizable: true,
  },
  {
    id: "inglesas-shimmer",
    nombre: "Inglesas Shimmer",
    categoria: "Monoflorales",
    descripcion: "Rosas inglesas con acabado shimmer brillante. Pura elegancia.",
    imagen: "assets/pag07.jpg",
    opciones: [
      { etiqueta: "12 shimmer", precio: 650 },
      { etiqueta: "24 shimmer", precio: 1300 },
      { etiqueta: "48 shimmer", precio: 2600 },
    ],
    colores: ["Rosa claro", "Melón"],
    cotizable: true,
    destacado: true,
  },
  {
    id: "rosas",
    nombre: "Rosas",
    categoria: "Monoflorales",
    descripcion: "El clásico atemporal: rosas frescas de tallo largo.",
    imagen: "assets/pag08.jpg",
    opciones: [
      { etiqueta: "24 rosas", precio: 740 },
      { etiqueta: "48 rosas", precio: 1430 },
      { etiqueta: "72 rosas", precio: 2120 },
      { etiqueta: "96 rosas", precio: 2810 },
    ],
    colores: ["Rosa", "Rosa claro", "Blanco", "Fucsia", "Naranja", "Rojo"],
    cotizable: true,
    destacado: true,
  },
  {
    id: "gerberas",
    nombre: "Gerberas",
    categoria: "Monoflorales",
    descripcion: "Color puro y vibrante para regalar buen ánimo.",
    imagen: "assets/pag09.png",
    opciones: [
      { etiqueta: "10 gerberas", precio: 600 },
      { etiqueta: "15 gerberas", precio: 800 },
      { etiqueta: "20 gerberas", precio: 1100 },
    ],
    colores: ["Rosa", "Rosa claro", "Blanco", "Fucsia", "Naranja", "Rojo"],
    cotizable: true,
  },
  {
    id: "rosa-inglesa-importacion",
    nombre: "Rosa Inglesa de Importación",
    categoria: "Monoflorales",
    descripcion: "Rosas inglesas premium de importación, abiertas y frondosas.",
    imagen: "assets/pag10.jpg",
    opciones: [
      { etiqueta: "10 rosas inglesas", precio: 1100 },
      { etiqueta: "20 rosas inglesas", precio: 2150 },
      { etiqueta: "30 rosas inglesas", precio: 3200 },
      { etiqueta: "40 rosas inglesas", precio: 4250 },
    ],
    colores: ["Rosa", "Blanco", "Fucsia", "Naranja", "Rojo", "Morado", "Amarillo"],
    cotizable: true,
  },
  {
    id: "rosa-inglesa-nacional",
    nombre: "Rosa Inglesa Nacional",
    categoria: "Monoflorales",
    descripcion: "Rosas inglesas nacionales de gran tamaño y aroma.",
    imagen: "assets/pag11.png",
    opciones: [
      { etiqueta: "30 rosas inglesas", precio: 1900 },
      { etiqueta: "45 rosas inglesas", precio: 3050 },
      { etiqueta: "60 rosas inglesas", precio: 4150 },
    ],
    colores: ["Rosa", "Blanco", "Fucsia", "Naranja", "Rojo", "Morado", "Amarillo"],
    cotizable: true,
  },
  {
    id: "tulipanes",
    nombre: "Tulipanes",
    categoria: "Monoflorales",
    descripcion: "Tulipanes de temporada, suaves y sofisticados.",
    imagen: "assets/pag12.jpg",
    opciones: [
      { etiqueta: "10 tulipanes", precio: 999 },
      { etiqueta: "20 tulipanes", precio: 1999 },
      { etiqueta: "30 tulipanes", precio: 2999 },
    ],
    colores: ["Rosa", "Blanco", "Fucsia", "Naranja", "Rojo", "Morado", "Amarillo"],
    cotizable: true,
    destacado: true,
  },

  /* ============== MIXTOS ============== */
  {
    id: "claveles-clasico",
    nombre: "Claveles Clásico",
    categoria: "Mixtos",
    descripcion: "Combinación equilibrada de claveles y mini rosas.",
    incluye: ["Claveles", "Mini rosas"],
    imagen: "assets/pag14.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 650 }],
    colores: ["Rosa", "Blanco", "Fucsia", "Naranja", "Rojo", "Morado", "Amarillo"],
  },
  {
    id: "mini-rosas-clasico",
    nombre: "Mini Rosas Clásico",
    categoria: "Mixtos",
    descripcion: "Mini rosas con follaje dollar mini para un look fresco.",
    incluye: ["Mini rosas", "Dollar mini"],
    imagen: "assets/pag15.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 680 }],
    colores: ["Rosa", "Rosa claro", "Blanco", "Fucsia", "Naranja", "Rojo"],
  },
  {
    id: "rosas-jumbo",
    nombre: "Rosas Jumbo",
    categoria: "Mixtos",
    descripcion: "Rosas mixtas jumbo acompañadas de mini gerberas.",
    incluye: ["12 rosas mixtas jumbo", "Mini gerberas"],
    imagen: "assets/pag16.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 700 }],
    colores: ["Rosa", "Blanco", "Amarillo", "Rojo"],
  },
  {
    id: "rosas-clasico",
    nombre: "Rosas Clásico",
    categoria: "Mixtos",
    descripcion: "Rosas premium combinadas con margaritas.",
    incluye: ["Rosas premium", "Margaritas"],
    imagen: "assets/pag17.jpg",
    opciones: [
      { etiqueta: "12 rosas premium + Margaritas", precio: 740 },
      { etiqueta: "24 rosas premium + Margaritas", precio: 1050 },
    ],
    colores: ["Rosa", "Blanco", "Fucsia", "Naranja", "Rojo", "Morado", "Amarillo"],
    destacado: true,
  },
  {
    id: "best-seller",
    nombre: "Best Seller",
    categoria: "Mixtos",
    descripcion: "Nuestro favorito: margaritas y mini rosas en armonía.",
    incluye: ["Margaritas", "Mini rosas"],
    imagen: "assets/pag18.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 750 }],
    colores: ["Rosa", "Rosa claro", "Blanco", "Fucsia", "Naranja", "Rojo"],
    destacado: true,
  },
  {
    id: "lirios-clasicos",
    nombre: "Lirios Clásicos",
    categoria: "Mixtos",
    descripcion: "Lirios aromáticos acompañados de claveles.",
    incluye: ["5 tallos de lirios", "20 claveles"],
    imagen: "assets/pag19.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 900 }],
    colores: ["Blanco", "Naranja", "Amarillo", "Vino", "Rosa", "Melón", "Rojo", "Fucsia"],
    nota: "Lirios: blanco, naranja, amarillo, vino · Claveles: blanco, rosa, amarillo, melón, rojo, fucsia",
  },
  {
    id: "hortensia",
    nombre: "Hortensia",
    categoria: "Mixtos",
    descripcion: "Hortensias voluminosas combinadas con claveles.",
    incluye: ["Hortensias", "Claveles"],
    imagen: "assets/pag20.jpg",
    opciones: [
      { etiqueta: "S · 2 hortensias + 20 claveles", precio: 950 },
      { etiqueta: "M · 3 hortensias + 40 claveles", precio: 1370 },
      { etiqueta: "L · 4 hortensias + 60 claveles", precio: 1925 },
    ],
    colores: ["Rosa", "Celeste", "Lila", "Blanco"],
  },
  {
    id: "rosas-claveles-premium",
    nombre: "Rosas & Claveles Premium",
    categoria: "Mixtos",
    descripcion: "Rosas premium y claveles en un arreglo abundante.",
    incluye: ["20 rosas premium", "20 claveles"],
    imagen: "assets/pag21.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 1085 }],
    colores: ["Rosa", "Blanco", "Fucsia", "Naranja", "Rojo", "Amarillo", "Lila"],
  },
  {
    id: "rosas-clasicas-gerberas",
    nombre: "Rosas Clásicas",
    categoria: "Mixtos",
    descripcion: "Rosas y gerberas para un ramo lleno de color.",
    incluye: ["20 rosas", "Gerberas"],
    imagen: "assets/pag22.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 1190 }],
    colores: ["Rosa", "Rosa claro", "Blanco", "Fucsia", "Naranja", "Rojo"],
  },
  {
    id: "rosas-inglesas-mix",
    nombre: "Rosas Inglesas",
    categoria: "Mixtos",
    descripcion: "Rosas inglesas nacionales con mini rosas.",
    incluye: ["15 rosas inglesas nacionales", "30 mini rosas"],
    imagen: "assets/pag23.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 1380 }],
    colores: ["Rosa", "Rojo", "Blanco", "Naranja", "Fucsia", "Amarillo", "Morado"],
    nota: "Inglesas: rosa, rojo · Mini rosas: blanco, rosa, naranja, fucsia, amarillo, morado",
  },
  {
    id: "tulipanes-gerberas",
    nombre: "Tulipanes y Gerberas",
    categoria: "Mixtos",
    descripcion: "Tulipanes y gerberas: frescura y color en un solo ramo.",
    incluye: ["10 gerberas", "10 tulipanes"],
    imagen: "assets/pag24.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 1600 }],
    colores: ["Rosa", "Rojo", "Blanco", "Naranja", "Fucsia", "Amarillo", "Morado"],
  },
  {
    id: "rosas-tulipanes",
    nombre: "Rosas y Tulipanes",
    categoria: "Mixtos",
    descripcion: "Rosas premium y tulipanes en una combinación de lujo.",
    incluye: ["24 rosas premium", "10 tulipanes"],
    imagen: "assets/pag25.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 1740 }],
    colores: ["Rosa", "Blanco", "Rojo", "Amarillo", "Lila", "Naranja", "Fucsia"],
    destacado: true,
  },
  {
    id: "shimmer-clasico",
    nombre: "Shimmer Clásico",
    categoria: "Mixtos",
    descripcion: "Rosas shimmer con mini rosas para un acabado brillante.",
    incluye: ["24 rosas shimmer", "Mini rosas"],
    imagen: "assets/pag26.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 1850 }],
    colores: ["Rosa", "Melón"],
  },
  {
    id: "lirios-orientales",
    nombre: "Lirios Orientales",
    categoria: "Mixtos",
    descripcion: "Lirios orientales con claveles, presencia y aroma.",
    incluye: ["40 claveles", "10 lirios orientales"],
    imagen: "assets/pag27.jpg",
    opciones: [{ etiqueta: "Arreglo único", precio: 2090 }],
    colores: ["Rosa", "Blanco", "Fucsia", "Naranja", "Morado", "Amarillo", "Verde", "Vino"],
  },
  {
    id: "jardin-rosa",
    nombre: "Jardín Rosa",
    categoria: "Mixtos",
    descripcion: "Nuestro arreglo más exuberante, todo en tonos rosa.",
    incluye: ["Claveles rosas", "Tulipanes rosas", "Rosas premium rosas", "Santa María", "Dólar mini"],
    imagen: "assets/pag28.png",
    opciones: [{ etiqueta: "Arreglo único", precio: 2900 }],
    colores: ["Rosa"],
    destacado: true,
  },
];

/* Mapa de color -> HEX para pintar los swatches. Clave en minúsculas. */
export const COLOR_HEX = {
  "rosa": "#E5989B",
  "rosa claro": "#F4C2C2",
  "blanco": "#F8F4EC",
  "fucsia": "#D6336C",
  "naranja": "#E8915B",
  "rojo": "#C1121F",
  "morado": "#8E6CA8",
  "amarillo": "#F2C14E",
  "verde": "#6B9E78",
  "vino": "#6E1E32",
  "lila": "#C9A7D9",
  "celeste": "#9CC3E0",
  "melón": "#F6A678",
  "melon": "#F6A678",
};
