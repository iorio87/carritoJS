const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody') // donde agrega los cursos seleccionados al carrito
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let carritoCompras = []


eventListeners()
function eventListeners () {
    //cuando se agrega un curso presionando 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso)

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        carritoCompras = [] //resetea el arreglo
        limpiarHTML() // elimina todo el HTML creado
    })
    
}

//Funciones
function agregarCurso (e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) { 
        const cursoSeleccionado = e.target.parentElement.parentElement      
        LeerContenido(cursoSeleccionado)
    }
    
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoID = e.target.getAttribute('data-id')

        //eliminar del carrito por el dataid
        carritoCompras = carritoCompras.filter(curso => curso.id !== cursoID)

        console.log(carritoCompras);
        carritoHTML()
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

function AgregarArticulo(infoCurso) {
    //Revisa si ya existe    
    const existe = carritoCompras.some(curso => curso.id === infoCurso.id)
    if (existe) {
        // se actualiza la cantidad
        const cursos = carritoCompras.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso
            } else {
                return curso
            }
        })
        carritoCompras = [...cursos]
        
    } else {
        carritoCompras = [...carritoCompras, infoCurso]
    }
    
    console.log(carritoCompras);
    carritoHTML()
}

// muestra el carrito en el HTML
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML()

    //recorre el carrito y genera el HTML
    carritoCompras.forEach(curso => {
        const {imagen, nombre, precio, cantidad, id} = curso
        console.log(curso);
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src='${imagen}' width=100>
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href='#' class='borrar-curso' data-id='${id}'> X </a>
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