
//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');

let productosCarrito = [];


cargarEventListener();
//Mis funciones
function cargarEventListener(){
    listaProductos.addEventListener('click',agregarProducto);

    //Elimina productos de carrito
    carrito.addEventListener('click', eliminarProducto);

    //Vaciar carrito
    vaciarCarrito.addEventListener('click', ()=> {
        productosCarrito = [];  //Reseteo el arreglo
        limpiarHTML();  //Eliminamos todo el html
    })
}

function agregarProducto(e){
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement.parentElement.parentElement.parentElement;
        datosDelProducto(productoSeleccionado);
    }
}

//Eliminar Producto de carrito
function eliminarProducto(e){
    if(e.target.classList.contains('borrar-producto')){
        const productoID = e.target.getAttribute('data-id')

        //Eliminando por el data-id
        productosCarrito = productosCarrito.filter( producto => producto.id !== productoID)
        
        carritoHTML();  //Itero nuevamente el carrito y muestro el html
    }
}

function datosDelProducto(producto){
    //Creo un objeto con la informacion de cada producto
    const infoProducto = {
        img: producto.querySelector('img').src,
        titulo: producto.querySelector('.tittle').textContent,
        price: producto.querySelector('.price').textContent,
        id: producto.querySelector('.agregar-carrito').getAttribute('data-id'),
        cantidad: 1
    }
    

    //Duplico la cantidad si mis productos son iguales
    const existente = productosCarrito.some(producto => producto.id === infoProducto.id)
    if(existente){
        const producto = productosCarrito.map(producto =>{
            if(producto.id === infoProducto.id){
                producto.cantidad ++;
                return producto;
            }else{
                return producto;
            }
        })
        productosCarrito = [...producto];
    }else{
        productosCarrito = [...productosCarrito, infoProducto]
    }

    carritoHTML()
}

function carritoHTML(){
    //Limpio el html previo
    limpiarHTML()

    //Recorro el carrito y genero el html
    productosCarrito.forEach(producto =>{
        const {img,titulo,price,id,cantidad} = producto;
        const row = document.createElement('tr');
        row.innerHTML = 
        `
        <td class="text-center"> <img src= "${img}" width="50"> </td>
        <td class="text-center"> ${titulo} </td>
        <td class="text-center"> ${price} </td>
        <td class="text-center"> ${cantidad} </td>
        <td class="text-center"> <a href="#" class="btn btn-danger borrar-producto" data-id="${id}">x</a> </td>
        `;
        contenedorCarrito.appendChild(row);
    })
}


//Elimina los cursos de html
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

