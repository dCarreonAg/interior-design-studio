/* =========================================================
   INTERIOR DESIGN STUDIO - JavaScript
   Un solo archivo para las 5 páginas.
   Cada bloque revisa primero si el elemento existe en la
   página actual (por ejemplo, el carrusel solo está en Inicio).
   ========================================================= */


/* ---------- 1. MENÚ PARA CELULAR ---------- */
const botonMenu = document.getElementById("boton-menu");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", function () {
  // toggle = si tiene la clase la quita, si no la tiene la pone
  menu.classList.toggle("abierto");
});


/* ---------- 2. CARRUSEL DEL HERO (solo en Inicio) ---------- */
const slides = document.querySelectorAll(".hero-slide");
const puntos = document.querySelectorAll(".punto");
let slideActual = 0;

function mostrarSlide(numero) {
  // 1) Quitamos la clase a la imagen y punto actuales
  slides[slideActual].classList.remove("visible");
  puntos[slideActual].classList.remove("activo");

  // 2) Guardamos el nuevo número
  slideActual = numero;

  // 3) Ponemos la clase a la nueva imagen y punto
  slides[slideActual].classList.add("visible");
  puntos[slideActual].classList.add("activo");
}

function siguienteSlide() {
  let siguiente = slideActual + 1;
  if (siguiente >= slides.length) {
    siguiente = 0; // si llegamos al final, regresamos a la primera
  }
  mostrarSlide(siguiente);
}

if (slides.length > 0) {
  // Cambia de imagen cada 5 segundos (5000 milisegundos)
  let temporizador = setInterval(siguienteSlide, 5000);

  // Al hacer clic en un punto, vamos a esa imagen
  puntos.forEach(function (punto, indice) {
    punto.addEventListener("click", function () {
      mostrarSlide(indice);
      // reiniciamos el temporizador para que no cambie justo después del clic
      clearInterval(temporizador);
      temporizador = setInterval(siguienteSlide, 5000);
    });
  });
}


/* ---------- 3. FORMULARIO DE CONTACTO (solo en Inicio) ---------- */
const formulario = document.getElementById("formulario-contacto");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    // Evita que la página se recargue al enviar
    evento.preventDefault();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");
    const aviso = document.getElementById("mensaje-form");

    // Quitamos los errores anteriores
    nombre.classList.remove("error");
    correo.classList.remove("error");
    mensaje.classList.remove("error");

    let hayErrores = false;

    // .trim() quita espacios al inicio y al final
    if (nombre.value.trim() === "") {
      nombre.classList.add("error");
      hayErrores = true;
    }

    // Revisamos que el correo tenga @ y un punto
    if (!correo.value.includes("@") || !correo.value.includes(".")) {
      correo.classList.add("error");
      hayErrores = true;
    }

    if (mensaje.value.trim() === "") {
      mensaje.classList.add("error");
      hayErrores = true;
    }

    if (hayErrores) {
      aviso.textContent = "Por favor completa los campos marcados en rojo.";
      aviso.className = "mensaje-form fallo";
    } else {
      // Nota: esto no envía el correo de verdad (eso necesita un servidor).
      aviso.textContent = "¡Gracias, " + nombre.value.trim() + "! Te contactaremos muy pronto.";
      aviso.className = "mensaje-form exito";
      formulario.reset(); // limpia el formulario
    }
  });
}


/* ---------- 4. FILTROS POR CATEGORÍA ----------
   Se usa en Estilos, Productos y Proyectos.
   - Los botones tienen data-filtro="moderno", "muebles", etc.
   - Los elementos tienen data-categoria con el mismo valor.  */

// Quita acentos y pasa a minúsculas: "Lámpara" -> "lampara"
// Así la búsqueda funciona aunque no escribas acentos.
function limpiarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function activarFiltros(idFiltros, idLista, idBuscador) {
  const contenedorFiltros = document.getElementById(idFiltros);
  if (!contenedorFiltros) {
    return; // esta página no tiene filtros, no hacemos nada
  }

  const botones = contenedorFiltros.querySelectorAll(".filtro");
  const elementos = document.getElementById(idLista).querySelectorAll("[data-categoria]");
  const buscador = document.getElementById(idBuscador); // puede no existir
  const sinResultados = document.getElementById("sin-resultados");

  let categoriaElegida = "todos";

  function actualizar() {
    let texto = "";
    if (buscador) {
      texto = limpiarTexto(buscador.value);
    }

    let visibles = 0;

    elementos.forEach(function (elemento) {
      const coincideCategoria =
        categoriaElegida === "todos" || elemento.dataset.categoria === categoriaElegida;
      const coincideTexto = limpiarTexto(elemento.textContent).includes(texto);

      if (coincideCategoria && coincideTexto) {
        elemento.classList.remove("oculto");
        visibles++;
      } else {
        elemento.classList.add("oculto");
      }
    });

    // Mensaje de "no encontramos nada"
    if (sinResultados) {
      if (visibles === 0) {
        sinResultados.classList.remove("oculto");
      } else {
        sinResultados.classList.add("oculto");
      }
    }
  }

  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      // Quitamos "activo" de todos los botones y se lo ponemos al que se hizo clic
      botones.forEach(function (b) {
        b.classList.remove("activo");
      });
      boton.classList.add("activo");

      categoriaElegida = boton.dataset.filtro;
      actualizar();
    });
  });

  // "input" se dispara cada vez que escribes una letra
  if (buscador) {
    buscador.addEventListener("input", actualizar);
  }
}

activarFiltros("filtros-estilos", "lista-estilos");
activarFiltros("filtros-productos", "lista-productos", "buscador");
activarFiltros("filtros-proyectos", "lista-proyectos");


/* ---------- 5. COMPARADOR ANTES / DESPUÉS (solo en Proyectos) ---------- */
const comparadores = document.querySelectorAll(".comparador");

comparadores.forEach(function (comparador) {
  const control = comparador.querySelector("input");
  const imagenDespues = comparador.querySelector(".despues");

  control.addEventListener("input", function () {
    // Recortamos la imagen "después" desde la izquierda según el control
    imagenDespues.style.clipPath = "inset(0 0 0 " + control.value + "%)";
  });
});


/* ---------- 6. AÑO AUTOMÁTICO EN EL PIE DE PÁGINA ---------- */
document.querySelectorAll(".anio").forEach(function (span) {
  span.textContent = new Date().getFullYear();
});
