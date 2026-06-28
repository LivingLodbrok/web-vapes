# 🌷 Florería Aurora — Catálogo + Configurador de pedidos

Sitio web estático (HTML5 + CSS3 + **JavaScript vanilla con ES Modules**, sin build,
sin backend) para una florería en Monterrey. Funciona como **catálogo + configurador
de pedido** y empuja al cliente a **WhatsApp (principal)** o **Instagram (secundario)**,
donde un humano cierra la venta.

## ✨ Qué hace

- Header fijo con CTA de WhatsApp siempre visible, hero, catálogo con **filtro por tipo de flor**.
- **Configurador** (núcleo): mínimo de compra, cantidad **solo en múltiplos válidos**
  (stepper, imposible elegir un valor intermedio), **colores propios de cada flor** como
  swatches con nombre, **subtotal en vivo** en MXN y **vista previa del mensaje** que se
  arma en tiempo real (el elemento "firma" del sitio).
- **Validación**: el botón *Solicitar pedido* está bloqueado hasta elegir color y cantidad válida.
- **WhatsApp**: abre `wa.me` con el mensaje del pedido ya escrito.
- **Instagram**: copia el resumen al portapapeles, avisa con un toast y abre el DM.
- Nosotros, reseñas con estrellas y footer con contacto/horario/ubicación.
- Responsive **mobile-first** (320px→desktop), accesible (contraste AA, foco de teclado,
  `aria-labels`, navegación por teclado, respeta `prefers-reduced-motion`) y SEO + Open Graph.

## 📁 Estructura

```
Floreria/
├── index.html              estructura + SEO/Open Graph
├── css/styles.css          diseño "Magenta Botánico" (Fraunces + DM Sans)
├── data/
│   ├── catalogo.js         🌸 9 ramos — AGREGA/EDITA FLORES AQUÍ
│   ├── negocio.js          ⚙️ WhatsApp, Instagram, horario, textos — EDITA AQUÍ
│   └── resenas.js          testimonios de clientes
├── js/
│   ├── main.js             entry point: arranca y conecta todo
│   ├── formato.js          moneda MXN (Intl es-MX) + helpers
│   ├── catalogo.js         render del grid + filtro
│   ├── configurador.js     🎯 núcleo: mínimos/múltiplos/colores/subtotal/validación
│   ├── conversion.js       mensaje + disparos WhatsApp/Instagram
│   └── ui.js               toast, secciones de contenido, navbar
├── vercel.json
└── README.md
```

## ✏️ Qué editar

**Datos de contacto y textos →** `data/negocio.js`

| Campo       | Ejemplo                                   |
|-------------|-------------------------------------------|
| `whatsapp`  | `"528116544571"` (52 + 10 dígitos, sin `+` ni espacios) |
| `instagram` | `"floreria.aurora"` (sin `@`)             |
| horario, dirección, historia, etc. | texto libre              |

**Agregar / editar ramos →** `data/catalogo.js` (copia un objeto del array).
Los precios son **fijos por presentación** (tamaño o paquete), no se multiplican:

```js
{
  id: "nuevo-ramo",                  // único, sin espacios
  nombre: "Mi Ramo Especial",
  categoria: "Mixtos",               // "Monoflorales" | "Mixtos" (filtro)
  descripcion: "Frase corta de venta.",
  incluye: ["Rosas", "Gerberas"],    // opcional, solo arreglos mixtos
  imagen: "assets/pag16.jpg",        // ruta de la foto
  opciones: [                        // presentaciones con PRECIO FIJO
    { etiqueta: "S", precio: 600 },
    { etiqueta: "M", precio: 1150 }
  ],
  colores: ["Blanco", "Rosa"],       // colores propios del ramo
  nota: "Aclaración de colores...",  // opcional
  cotizable: true,                   // opcional: muestra "cotiza más"
  destacado: true                    // opcional: insignia "Destacado"
}
```

Los colores se pintan con el mapa `COLOR_HEX` (al final de `data/catalogo.js`);
si usas un color nuevo, agrégalo ahí. No hace falta tocar nada en `js/`.

> Las fotos reales están en `assets/pagNN.jpg` (extraídas del catálogo PDF de Fellie).

## ▶️ Probar localmente

> ⚠️ Usa ES Modules, así que **no funciona con doble clic** (`file://`).
> Debes servirlo por HTTP local:

```powershell
npx serve .
# o, con Python:
python -m http.server 8000
```

Luego abre la dirección que te muestre (p. ej. `http://localhost:3000`).

## 🚀 Desplegar (Vercel / Netlify / GitHub Pages)

Es un sitio estático sin build: subir la carpeta tal cual.

**Vercel (sin terminal):** [vercel.com](https://vercel.com) → *Add New → Project* →
arrastra la carpeta `Floreria` → *Deploy*. Te da una URL `https://...vercel.app`.

**Vercel (CLI):**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:** arrastra la carpeta a [app.netlify.com/drop](https://app.netlify.com/drop).
**GitHub Pages:** sube los archivos al repo y activa Pages sobre la rama principal.

> Nota: el copiado al portapapeles (Instagram) requiere HTTPS, que Vercel/Netlify dan
> por defecto.

## 🧩 Nota técnica sobre Instagram

Instagram **no** permite prellenar el texto de un DM mediante un link (a diferencia de
WhatsApp). Automatizar el envío real requeriría la **Graph API de Instagram + un backend
autenticado**, fuera del alcance de este sitio estático. Por eso copiamos el resumen al
portapapeles y abrimos el DM para que el cliente solo lo pegue. (Documentado en
`js/conversion.js`.)
