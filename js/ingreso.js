// let nombre = prompt("Te damos la bienvenida! Ingresá tu nombre");
// alert(`Hola ${nombre}!`);
// console.log(`Hola ${nombre}!`);

// let edad = parseInt(prompt("Para continuar, ingresa tu edad"));
// if (edad >= 18) {
//   alert("Bien! podes ingresar al sitio");
//   window.location.href = "../html/index.html";
// }else {
//   alert(`Lo sentimos ${nombre}, aun no tenes la edad suficiente para realizar estas compras`);
//   window.location.href = "../html/restriccion-edad.html";
// }


document.addEventListener("DOMContentLoaded", function() {
  const ingresarButton = document.getElementById("ingresarButton");

  ingresarButton.addEventListener("click", function() {
    const edadInput = document.getElementById("edadInput");
    const edad = parseInt(edadInput.value);

    if (isNaN(edad)) {
      alert("Por favor, ingresa un número válido para la edad.");
      return;
    }

    if (edad >= 18) {
      window.location.href = "../html/index.html";
    } else {
      alert(`Lo sentimos, aun no tienes la edad suficiente para realizar estas compras`);
      // O puedes redirigir a una página diferente para menores de edad si lo deseas
      window.location.href = "../html/restriccion-edad.html";
    }
  });
});