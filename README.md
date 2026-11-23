# Interior Design Studio 🛋️

Sitio web de una plataforma de **diseño de interiores**, hecho solo con **HTML, CSS y JavaScript**. No usa frameworks ni librerías y no hay nada que instalar.

Autora: **Beatriz Carreón Aguirre**

## ¿Cómo lo abro?

1. Descarga o clona esta carpeta.
2. Haz doble clic en `index.html` y se abrirá en tu navegador.

Para editarlo, te recomiendo [Visual Studio Code](https://code.visualstudio.com/) con la extensión **Live Server**: la página se recarga sola cada vez que guardas un cambio.

## Páginas

| Archivo | Página | Qué tiene |
|---|---|---|
| `index.html` | Inicio | Banner con carrusel, ¿Quiénes somos?, misión y visión, estilos, proyectos, productos y diseñadores destacados, formulario de contacto |
| `estilos.html` | Estilos de diseño | 6 estilos con descripción, galería y recomendaciones, y filtro por categoría |
| `productos.html` | Productos | Catálogo con buscador y filtro por categoría (muebles, iluminación, decoración, textiles, accesorios) |
| `disenadores.html` | Diseñadores | Perfil de cada diseñador: bio, especialidades, estudios, portafolio y redes |
| `proyectos.html` | Proyectos | Portafolio con comparador "antes y después", testimonios y filtro por tipo de espacio |

## Estructura de carpetas

```
interior-design-studio/
├── index.html
├── estilos.html
├── productos.html
├── disenadores.html
├── proyectos.html
├── css/
│   └── styles.css   ← todos los estilos (un solo archivo)
├── js/
│   └── script.js    ← toda la interactividad (un solo archivo)
└── img/             ← imágenes
```

## ¿Qué hace el JavaScript?

Todo está en `js/script.js` y comentado paso a paso:

1. **Menú para celular:** el botón ☰ abre y cierra el menú.
2. **Carrusel:** cambia la imagen del banner cada 5 segundos.
3. **Formulario:** revisa que los campos estén llenos antes de "enviar".
4. **Filtros y buscador:** muestran u ocultan tarjetas según la categoría o el texto.
5. **Antes y después:** el control deslizante recorta la foto del "después".
6. **Año automático** en el pie de página.

## Cómo cambiar cosas

- **Colores y fuentes:** al inicio de `css/styles.css`, en la sección `:root`. Si cambias `--verde`, cambia en todo el sitio.
- **Agregar un producto:** en `productos.html`, copia un bloque `<article> ... </article>` completo, pégalo y cambia los datos. El `data-categoria` tiene que ser uno de estos: `muebles`, `iluminacion`, `decoracion`, `textiles` o `accesorios`.
- **Poner fotos reales:** las imágenes de `img/` son ilustraciones de muestra (`.svg`). Para cambiarlas, guarda tu foto en `img/` (por ejemplo `img/sala.jpg`) y cambia el `src` en el HTML:
  ```html
  <img src="img/sala.jpg" alt="Sala moderna">
  ```
  Las imágenes del carrusel están en `index.html`, dentro de `style="background-image: url('...')"`.
- **Menú y pie de página:** se repiten en las 5 páginas (en HTML puro no se pueden "importar"). Si cambias algo ahí, cámbialo en los 5 archivos.

> **Nota:** el formulario muestra un mensaje de "¡Gracias!", pero no manda correos. Para enviarlos de verdad se necesita un servidor o un servicio como [Formspree](https://formspree.io/).

## Publicarlo gratis con GitHub Pages

1. En GitHub, entra al repositorio → **Settings** → **Pages**.
2. En **Branch** elige `main` y la carpeta `/ (root)`. Luego haz clic en **Save**.
3. Espera uno o dos minutos. Tu página quedará en
   `https://TU-USUARIO.github.io/interior-design-studio/`
