/////////////////////////////////IMPORT///////////////////////////////////////////////////

const productosContainer = document.querySelector('.grid-container');;
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const botonCarrito = document.querySelector('#cart-container');
const carritoContainer = document.querySelector('#carrito-index');
const cerrarCarrito = document.querySelector('#cerrarCarrito');
botonCarrito.addEventListener('click', () => {
  carritoContainer.classList.toggle('abierto');
});
cerrarCarrito.addEventListener('click', () => {
  carritoContainer.classList.remove('abierto'); // Cierra el carrito al hacer clic en el botón de cerrar
});


/////////////////////////////////FUNCIONES///////////////////////////////////////////////////

function agregarAlCarrito(idProducto, producto, carrito) {
  const indice = carrito.findIndex(producto => producto.idProductoEnCarrito === idProducto)
//Si el indice es -1 es que no esta en el carrito  
  if(indice === -1){
    const productoEnCarrito = {
      idProductoEnCarrito: idProducto,
      nombre: producto.nombre,
      imagen: producto.imagen,
      cantidad: 1,
      precio: producto.precio,
    }
    carrito.push(productoEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(carrito) )
  //Si el indice es distinto a -1, es que esta en el carrito y tenes que sumar la cantidad
  }else{
    carrito[indice].cantidad++;
  }
}

const dibujarCarrito = () => {
  listaCarrito.innerHTML = "";

  carrito.forEach((producto, index) => {
    console.log(producto);
    const {idProductoEnCarrito:idProducto, nombre, cantidad, precio, imagen} = producto;

    if (index === 0) {
      const encabezado = document.createElement("tr");
      encabezado.innerHTML = `
        <th class="hd-carrito">Imagen</th>
        <th class="hd-carrito">Nombre</th>
        <th class="hd-carrito">Unidades</th>
        <th class="hd-carrito">Precio Un.</th>
        <th class="hd-carrito">Precio Total</th>
        <th class="hd-carrito">Acciones</th>
      `;
      listaCarrito.appendChild(encabezado);
    }

    let fila = document.createElement("tr");
    fila.className = "producto-carrito";

    fila.innerHTML = `
      <td><img src="${imagen}" alt="Imagen del producto"></td>
      <td>${nombre}</td>
      <td>${cantidad}</td>
      <td>${precio}</td>
      <td>${precio * producto.cantidad}</td>
      <td>
        <button id="-${idProducto}" class="restar-producto">-</button>
        <button id="+${idProducto}" class="sumar-producto">+</button>
      </td>
    `;

    listaCarrito.appendChild(fila);
    const btnRestar = document.getElementById(`-${idProducto}`);
    const btnAgregar = document.getElementById(`+${idProducto}`);
    btnAgregar.addEventListener("click", () => aumentarCantidad(idProducto));
    btnRestar.addEventListener("click", () => restarCantidad(idProducto));
  });
  dibujarFooter();
};

const dibujarFooter = () => {
  if (carrito.length > 0) {
    footCarrito.innerHTML = "";

    let footer = document.createElement("tr");
    footer.innerHTML = `
      <th><b>Totales:</b></th>
      <td></td>
      <td>${generarTotales().cantidadTotal}</td>
      <td></td>
      <td>${generarTotales().costoTotal}</td>
    `;
    footCarrito.append(footer);

    const comprar = document.getElementById("comprar");
    comprar.style.display = "block";
    comprar.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  } else {
    footCarrito.innerHTML = `
    <h3 class="carrito-vacio">No hay productos en carrito</h3>
    `;
    const comprar = document.getElementById("comprar");
    comprar.style.display = "none";
  }
}


const generarTotales = () => {
  const costoTotal = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0);
  return {
      costoTotal: costoTotal,
      cantidadTotal: cantidadTotal,
  }
}

const aumentarCantidad = (id) => {
  console.log(carrito);
  const indexProductoCarrito = carrito.findIndex((producto) => producto.idProductoEnCarrito === id)

  carrito[indexProductoCarrito].cantidad++

  localStorage.setItem("carrito", JSON.stringify(carrito))
  dibujarCarrito()
}

const restarCantidad = (id) => {
  const indexProductoCarrito = carrito.findIndex((producto) => producto.idProductoEnCarrito === id)

  carrito[indexProductoCarrito].cantidad--

  if(carrito[indexProductoCarrito].cantidad === 0){
      carrito.splice(indexProductoCarrito, 1)
  }
  localStorage.setItem("carrito", JSON.stringify(carrito))
  dibujarCarrito()
}

/////////////////////////////////EJECUCION DE CODIGO///////////////////////////////////////////////////



fetch("./data.json")
  .then((response) => response.json())
  .then((data) => 
    data.forEach((item) => {
      const tarjetaProducto = document.createElement('div');
      tarjetaProducto.classList.add('tarjeta-producto');

      const nombreProducto = document.createElement('p');
      nombreProducto.classList.add('nombre-producto');
      nombreProducto.textContent = item.nombre;

      const precioProducto = document.createElement('p');
      precioProducto.classList.add('precio-producto');
      precioProducto.textContent = `$${item.precio}`;

      const imagenProducto = document.createElement('img');
      imagenProducto.classList.add('imagen-producto');
      imagenProducto.src = item.imagen;
      imagenProducto.alt = item.nombre;

      const botonAgregar = document.createElement('button');
      botonAgregar.textContent = 'Agregar al carrito';
      botonAgregar.classList.add('boton-agregar');
      botonAgregar.dataset.productId = item.idProducto;

      tarjetaProducto.appendChild(imagenProducto);
      tarjetaProducto.appendChild(nombreProducto);
      tarjetaProducto.appendChild(precioProducto);
      tarjetaProducto.appendChild(botonAgregar);

      botonAgregar.addEventListener('click', () => {
        const idProducto = botonAgregar.dataset.productId;
        agregarAlCarrito(idProducto, item, carrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        dibujarCarrito()
      });

      productosContainer.appendChild(tarjetaProducto);
    }));

dibujarCarrito()