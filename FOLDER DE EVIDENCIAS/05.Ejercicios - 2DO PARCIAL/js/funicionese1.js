function validarn(e){

    var teclado = (document.all)? e.keyCode : e.which; 

   if(teclado == 8) 
     return true;

   var patron =/[0-9\d .]/;

  var codigo = String.fromCharCode(teclado);
  return patron.test(codigo);

  
}
// calcular el interes
//DELIMITAR EL NUMERO DE DECIMALES

function interes(){

    var valor = document.getElementById("cantidadi").value; 
var parseo = parseFloat(valor);
alert(parseo);
      var interes = parseo * (0.0865);
      
      //LIMITE A 2 DECIMALES
      alert(interes);
            var total = parseo + interes;
alert(total);
document.getElementById("saldoi").value = "$ " + total.toFixed(2);

//LIMTE A 2 DECIMALES
}

function borrari(){
  document.getElementById("saldoi").value = "";
  document.getElementById("cantidadi").value = ""; 
}

//Del ejercicio 1, tenemos que agregar el campo numero de meses y sera una imversion de maximo 18 meses 


// Un vendedor recibe un sueldo base mas un 10% extra por comision de sus ventas, el vendedor desea saber cuanto dinero obtendra por concepto de comisiones por las tres ventas que realiza en el mes y el total que recibira en el mes tomando en cuenta su sueldo base y comisiones.
// se deben ingresar 3 ventas, un sueldo base y desupues calcular un monto total, debe apareceer cuanto cobra por la comision y la suma totoal

//una tienda ofrece un descuento del 15% sobre el total de la compra y un cliente desea saber cuanto debera pagar finalmente por su compra. 

//3 un producto de debe ingresaer un producto con su precio y aplicarle el 15% y el sistema debe mostrar el producto, precio, descuento, total a pagar

//un alumno desea saber cual sera su calificacion final en la materia de Algoritma, dicha calificacion se compone de los siguientes porcentajes: 55% del promedio de sus tres calificaciones parciales, 30% de la calificacion del examen final y 15% de la calificacion de un trabajo final. Realice un algoritmo para determinar cual sera la calificacion final del alumno.

//  4 se debe ingresar Calif 1, C2, C3 se aplica el promedio y su porcentaje, se ingresa trabajo final y se aplica % y examen final se aplica el %, se debe de mostroar el total de calificaciones



// 5 Se debe ingresar cantidad de hombres y mujeres y mostrar sus porcentajes correspondientes 

// 6 Calcular la edad de una persona 