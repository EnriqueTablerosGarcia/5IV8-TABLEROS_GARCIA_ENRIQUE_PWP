//  PROBLEMA 1
function problema1() {
  var n1 = document.getElementById("p1-num1").value;
  var n2 = document.getElementById("p1-num2").value;

  if (n1 === "" || n2 === "") {
    document.getElementById("p1-output").textContent = "Por favor ingresa ambos números.";
    return;
  }

  n1 = Number(n1);
  n2 = Number(n2);
  var resultado;

  if (n1 === n2) {
    resultado = n1 * n2;
  } else if (n1 > n2) {
    resultado = n1 - n2;
  } else {
    resultado = n1 + n2;
  }

  document.getElementById("p1-output").textContent = "Resultado: " + resultado;
}

//  PROBLEMA 2
function problema2() {
  var n1 = document.getElementById("p2-num1").value;
  var n2 = document.getElementById("p2-num2").value;
  var n3 = document.getElementById("p2-num3").value;

  if (n1 === "" || n2 === "" || n3 === "") {
    document.getElementById("p2-output").textContent = "Por favor ingresa los tres números.";
    return;
  }

  n1 = Number(n1);
  n2 = Number(n2);
  n3 = Number(n3);


  if (n1 === n2 || n1 === n3 || n2 === n3) {
    document.getElementById("p2-output").textContent = "Los 3 números deben ser diferentes";
    return;
  }

  var mayor;

  if (n1 > n2 && n1 > n3) {
    mayor = n1;
  } else if (n2 > n1 && n2 > n3) {
    mayor = n2;
  } else {
    mayor = n3;
  }

  document.getElementById("p2-output").textContent = "El número mayor es: " + mayor;
}

//  PROBLEMA 3
function problema3() {
  var horas = parseFloat(document.getElementById("p3-horas").value);
  var salario = parseFloat(document.getElementById("p3-salario").value);

  if (isNaN(horas) || isNaN(salario) || horas < 0 || salario < 0) {
    document.getElementById("p3-output").textContent = "Por favor ingresa valores válidos.";
    return;
  }

  var pagoTotal = 0;

  if (horas <= 40) {
    pagoTotal = horas * salario;
  } else {
    var extras = horas - 40;
    if (extras <= 8) {
      pagoTotal = (40 * salario) + (extras * salario * 2);
    } else {
      pagoTotal = (40 * salario) + (8 * salario * 2) + ((extras - 8) * salario * 3);
    }
  }

  document.getElementById("p3-output").textContent = "Pago total: $" + pagoTotal.toFixed(2);
}

// PROBLEMA 4
function problema4() {
    var salario = parseFloat(document.getElementById("p4-salario").value);
    var antiguedad = parseFloat(document.getElementById("p4-antiguedad").value);

    if (isNaN(salario) || isNaN(antiguedad) || salario < 0 || antiguedad < 0) {
        document.getElementById("p4-output").textContent = "Por favor ingresa valores válidos.";
        return;
    }

    var porcentaje = 0;

    if (antiguedad < 1) porcentaje = 0.05;
    else if (antiguedad >= 1 && antiguedad < 2) porcentaje = 0.07;
    else if (antiguedad >= 2 && antiguedad < 5) porcentaje = 0.10;
    else if (antiguedad >= 5 && antiguedad < 10) porcentaje = 0.15;
    else porcentaje = 0.20;

    var utilidad = salario * porcentaje;

    document.getElementById("p4-output").textContent = "La utilidad anual es: $" + utilidad.toFixed(2);
}
