//Acá se encuentran las capturas e import

import productos from '../js/productos.js'; // Importa el array de productos desde productos.js

const productosContainer = document.getElementById('tarjeta-producto');
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
let carrito = JSON.parse(localStorage.getItem("productos")) || []



//Acá se encuentran las funciones

function agregarAlCarrito(idProducto, producto, carrito) {
  const indice = carrito.findIndex(producto => producto.idProductoEnCarrito === idProducto)
//Si el indice es -1 es que no esta en el carrito  
  if(indice === -1){
    const productoEnCarrito = {
      idProductoEnCarrito: idProducto,
      nombre: producto.nombre,
      imagen: producto.imagen,
      cantidad: 1,
    }
    carrito.push(productoEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(carrito) )
//Si el indice es distinto a -1, es que esta en el carrito y tenes que sumar la cantidad
  }else{
    carrito[indice].cantidad++;
  }
  console.log(`Producto con ID ${idProducto} añadido al carrito.`);
  console.log(carrito)
}

const dibujarCarrito = () => {
  listaCarrito.innerHTML = ""

  carrito.forEach(producto => {

    const {idProducto, nombre, cantidad, precio, imagen} = producto
    let body = document.createElement("tr")

    body.className = "producto__carrito"

    body.innerHTML = `
    <th><img id="fotoProductoCarrito" src="${imagen}" class="card-img-top" style="width:20%"</th>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>${precio / producto.cantidad}</td>
    <td>${precio}</td>
    <td>
    <button id="+${idProducto}" class="btn btn-success">+</button>
    <button id="-${idProducto}" class="btn btn-danger">-</button>
    </td>
    `
    listaCarrito.append(body)
    
    const btnAgregar = document.getElementById(`+${idProducto}`)
    const btnRestar = document.getElementById(`-${idProducto}`)

    btnAgregar.addEventListener("click", () => aumentarCantidad(idProducto))
    btnRestar.addEventListener("click", () => restarCantidad(idProducto))
    
  });

  dibujarFooter()
}

const dibujarFooter = () => {

  if(carrito.length > 0){
    footCarrito.innerHTML = ""

    let footer = document.createElement("tr")
      footer.innerHTML = `
      <th><b>Totales:</b></th>
      <td></td>
      <td>${generarTotales().cantidadTotal}</td>
      <td></td>
      <td>${generarTotales().costoTotal}</td>
      `
    footCarrito.append(footer)
  }else{
    footCarrito.innerHTML = "<h3>No hay producto en carrito</h3>"
  }

}




const generarTotales = () => {
  const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
  const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0)

  return {
      costoTotal: costoTotal,
      cantidadTotal: cantidadTotal
  }
}

const aumentarCantidad = (id) => {
  const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
  const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

  carrito[indexProductoCarrito].cantidad++
  carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

  localStorage.setItem("carrito", JSON.stringify(carrito))
  dibujarCarrito()
}

const restarCantidad = (id) => {
  const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
  const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

  carrito[indexProductoCarrito].cantidad--
  carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

  if(carrito[indexProductoCarrito].cantidad === 0){
      carrito.splice(indexProductoCarrito, 1)
  }
  localStorage.setItem("carrito", JSON.stringify(carrito))
  dibujarCarrito()
}









//Aca se ejecuta el codigo

Swal.fire({
    position: "center",
    icon: "success",
    title: "Podes ingresar a nuestra tienda. Salud!",
    showConfirmButton: false,
    timer: 2000,
});

productos.forEach(producto => {
  const tarjetaProducto = document.createElement('div');
  tarjetaProducto.classList.add('tarjeta-producto');

  const nombreProducto = document.createElement('p');
  nombreProducto.classList.add('nombre-producto');
  nombreProducto.textContent = producto.nombre;

  const precioProducto = document.createElement('p');
  precioProducto.classList.add('precio-producto');
  precioProducto.textContent = `$${producto.precio}`;

  const imagenProducto = document.createElement('img');
  imagenProducto.classList.add('imagen-producto');
  imagenProducto.src = producto.imagen;
  imagenProducto.alt = producto.nombre;

  const botonAgregar = document.createElement('button');
  botonAgregar.textContent = 'Agregar al carrito';
  botonAgregar.classList.add('boton-agregar');
  botonAgregar.dataset.productId = producto.idProducto;

  tarjetaProducto.appendChild(imagenProducto);
  tarjetaProducto.appendChild(nombreProducto);
  tarjetaProducto.appendChild(precioProducto);
  tarjetaProducto.appendChild(botonAgregar);

  botonAgregar.addEventListener('click', () => {
    const idProducto = botonAgregar.dataset.productId;
    agregarAlCarrito(idProducto, producto, carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    dibujarCarrito()
  });

  productosContainer.appendChild(tarjetaProducto);
});

console.log(productos)

dibujarCarrito()

