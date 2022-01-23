const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody') // donde agrega los cursos seleccionados al carrito
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let carritoCompras = []


eventListeners()
function eventListeners () {
    //cuando se agrega un curso presionando 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso)
    
}

//Funciones
function agregarCurso (e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) { 
        const cursoSeleccionado = e.target.parentElement.parentElement      
        LeerContenido(cursoSeleccionado)
    }
    
}

//Lee el contenido del HTML que clickeamos
function LeerContenido(curso) {
    
    // creo un objeto con el contenido del curso
    const infoCurso = {
        nombre: curso.querySelector('h4').textContent,
        imagen: curso.querySelector('img').src,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    AgregarArticulo(infoCurso)
}

function AgregarArticulo(curso) {
    carritoCompras = [...carritoCompras, curso]

    carritoHTML()
}

// muestra el carrito en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML()

    //recorre el carrito y genera el HTML
    carritoCompras.forEach(curso => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            ${curso.nombre}
        </td>
        `
        //agrega el HTML en el tbody (en la tabla)
        contenedorCarrito.appendChild(row)
    })
}

function limpiarHTML() {
   // contenedorCarrito.innerHTML = ''   /* forma no recomendada*/

   while (contenedorCarrito.firstChild) {
       contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }
}