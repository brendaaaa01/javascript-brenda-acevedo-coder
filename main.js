//COSAS DE LA CLASE

/* function calculadora(num1, num2, operacion) {
   switch (operacion) {
     case "2":
       return num1 + num2;
       break;

     case "4":
       return num1 - num2;
       break;

     case "6":
       return num1 * num2;
       break;

     default:
       return "Operacion no encontrada";
       break;
   }
}

let numero1 = parseInt(prompt("Ingrese el número uno"));
let numero2 = parseInt(prompt("Ingrese el número dos"));
let operacion = prompt("Ingrese la operación");

let resultado = calculadora(numero1, numero2, operacion);

alert(`El resultado de la operacion es: ${resultado}`);
let resultado; */

/*let salario = parseInt(prompt("Bienvenido! Para calcular tu prestamo, ingresa tu sueldo en mano"));

if (salario >= 99999) {
    alert("Bien! podes acceder al prestamo");
}else {
    alert("Lo sentimos, aún no podemos brindarte un préstamo");
}*/




//CODIGO INTENTO DE CALCULADORA DE PRESTAMO

/*let edad = parseInt(prompt("Bienvenido! para continuar ingresa tu edad"));

if (edad >= 18) {
    alert("Bien! podes acceder al prestamo");
    
    let sueldo = parseInt(prompt("Ingrese su sueldo en mano"));
    for (let i = 1.06; i <= 10; i++) {
    console.log(i);
    let resultado = sueldo * i;
    alert(`${sueldo} * ${i} = ${resultado}`);
    }

}else {
    alert("Lo sentimos, todavia no podes acceder a este prestamo");
}*/



function sueldo() {
  let salario = prompt("Ingrese su sueldo en mano");
  alert(`su salario es ${salario}`);
  if (salario >= 99999) {
    alert("Bien! podes acceder al prestamo");
    const prestamo = calculadoraPrestamo(salario);
    alert(`Tu prestamo es ${prestamo}`)
    const cuotaAnual = calcularCuota(prestamo)
    alert(`Tu cuota mensual es de ${cuotaAnual} por mes durante 12 meses`)
  }else {
    alert("Lo sentimos, aún no podemos brindarte un préstamo");
  }
}

function calculadoraPrestamo(sueldo){
  let prestamoTotal = sueldo * 3;
  for (let i = 1; i <= 12; i++) {
    prestamoTotal = prestamoTotal + (prestamoTotal * 0.06) //Sumando prestamo total + 6% de si mismo
  }
  return prestamoTotal;
}

function calcularCuota(prestamo){
  const cuota = prestamo / 12;
  return cuota;
}




 //Aca se ejecuta el codigo
let nombre = prompt("Bienvenido! Ingresá tu nombre");
alert(`Hola ${nombre}!`);
console.log(`Hola ${nombre}!`);

let edad = parseInt(prompt("Para continuar, ingresa tu edad"));
if (edad >= 18) {
  alert("Bien! podes acceder al prestamo");
  sueldo();
}else {
  alert(`Lo sentimos ${nombre}, en ${18 - edad} años podras acceder al prestamo`);
}






  

