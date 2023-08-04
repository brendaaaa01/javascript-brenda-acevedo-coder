//Acá se encuentran las funciones



class Producto {
  constructor(imagen, titulo, precio) {
    this.imagen = imagen;
    this.titulo = titulo;
    this.precio = precio;
  }
}

const producto1 = new Producto("img-cervezaamber", "Cerveza Amber", 900);
const producto2 = new Producto("img-cervezagoldenale", "Cerveza Golden Ale", 900);
const producto3 = new Producto("img-cervezaipa", "Cerveza Ipa", 1200);
const producto4 = new Producto("img-cervezastout", "Cerveza Stout", 1000);

const productos = [producto1, producto2, producto3, producto4];

function mostrarListado() {
  console.log("Listado de productos:");
  productos.forEach((producto) => {
    console.log(`Titulo: ${producto.titulo}`);
    console.log(`Imagen: ${producto.imagen}`);
    console.log(`Precio: $${producto.precio}`);
    console.log("-------------------------");
  });
}


function agregarAlCarrito() {
  const nombreProducto = prompt("Ingrese el nombre del producto que desea agregar al carrito:");
  const productoEncontrado = productos.find(producto => producto.titulo === nombreProducto);

  if (productoEncontrado !== undefined) {
    alert(`Agregaste al carrito una ${productoEncontrado.titulo}!`);
  } else {
    alert(`Lo sentimos, no tenemos ese producto`);
  }
}





//Aca se ejecuta el codigo
let nombre = prompt("Te damos la bienvenida! Ingresá tu nombre");
alert(`Hola ${nombre}!`);
console.log(`Hola ${nombre}!`);

let edad = parseInt(prompt("Para continuar, ingresa tu edad"));
if (edad >= 18) {
  alert("Bien! podes ingresar al sitio");
  mostrarListado();
  agregarAlCarrito();
}else {
  alert(`Lo sentimos ${nombre}, aun no tenes la edad suficiente para realizar estas compras`);
  window.location.href = "restriccion-edad.html";
}

let container = document.getElementById("container");

productos.forEach((item) => {
  let div = document.createElement("div");
  div.innerHTML = `
    <h2>Titulo: ${item.titulo}</h2>
    <p>Imagen: ${item.imagen}</p>
    Precio: $${item.precio}
  `;

  container.append(div);
});