// Obtener info
const resumenCompra = document.getElementById("resumen-compra");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Funciones
function calcularSubtotal(precio, cantidad) {
  return precio * cantidad;
}
function calcularTotal(carrito) {
  return carrito.reduce((total, producto) => total + calcularSubtotal(producto.precio, producto.cantidad), 0);
}
const formulario = document.createElement("form");
formulario.id = "formulario-compra";

function crearInput(labelText, inputType, inputName) {
  const div = document.createElement("div");
  div.classList.add("formulario-campo");

  const label = document.createElement("label");
  label.textContent = labelText;
  div.appendChild(label);

  const input = document.createElement("input");
  input.type = inputType;
  input.name = inputName;
  div.appendChild(input);

  return div;
}




///////////////////////////FORMULARIO DE COMPRA/////////////////////////////////
const datosPersonalesDiv = document.createElement("div");
datosPersonalesDiv.classList.add("formulario-seccion");
const nombreInput = crearInput("Nombre", "text", "nombre");
const emailInput = crearInput("Email", "email", "email");
datosPersonalesDiv.appendChild(nombreInput);
datosPersonalesDiv.appendChild(emailInput);

const tarjetaDiv = document.createElement("div");
tarjetaDiv.classList.add("formulario-seccion");
const numeroTarjetaInput = crearInput("Número de Tarjeta", "text", "numeroTarjeta");
const fechaExpiracionInput = crearInput("Fecha de Expiración", "text", "fechaExpiracion");
tarjetaDiv.appendChild(numeroTarjetaInput);
tarjetaDiv.appendChild(fechaExpiracionInput);

const envioDiv = document.createElement("div");
envioDiv.classList.add("formulario-seccion");
const direccionInput = crearInput("Dirección de Envío", "text", "direccion");
const codigoPostalInput = crearInput("Código Postal", "text", "codigoPostal");

envioDiv.appendChild(direccionInput);
envioDiv.appendChild(codigoPostalInput);

formulario.appendChild(datosPersonalesDiv);
formulario.appendChild(tarjetaDiv);
formulario.appendChild(envioDiv);
const contenedorFormulario = document.querySelector(".formulario");
contenedorFormulario.appendChild(formulario);

const finalizarCompra = document.getElementById("finalizarCompra");
finalizarCompra.addEventListener("click", function () {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Compra realizada con exito",
    showConfirmButton: false,
    timer: 2000,
  }).then(() => {
    window.location.href = "index.html";
  });
});





///////////////////////////RESUMEN DE COMPRA/////////////////////////////////
const headerResumen = document.createElement("table");
headerResumen.classList.add("header-resumen");
headerResumen.innerHTML = `
  <thead>
    <tr>
      <th>Producto</th>
      <th>Cantidad</th>
      <th>Precio Unitario</th>
      <th>Subtotal</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3"><b>Total:</b></td>
      <td id="total-compra"></td>
    </tr>
  </tfoot>
`;
resumenCompra.appendChild(headerResumen);
const tbody = headerResumen.querySelector("tbody");

carrito.forEach(producto => {
  const { nombre, precio, cantidad } = producto;
  const subtotal = calcularSubtotal(precio, cantidad);

  const contenidoResumen = document.createElement("tr");
  contenidoResumen.classList.add("contenido-resumen");
  contenidoResumen.innerHTML = `
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>$${precio.toFixed(2)}</td>
    <td>$${subtotal.toFixed(2)}</td>
  `;

  tbody.appendChild(contenidoResumen);
});
const totalCompra = calcularTotal(carrito);
const totalCompraElement = document.getElementById("total-compra");
totalCompraElement.textContent = `$${totalCompra.toFixed(2)}`;

const volverAlIndexButton = document.getElementById("volver-al-index");
volverAlIndexButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
