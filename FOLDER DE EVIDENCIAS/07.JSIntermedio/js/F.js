//  PROBLEMA 1
function problema1() {
  var n1 = document.getElementById("p1-num1").value.trim();
  var n2 = document.getElementById("p1-num2").value.trim();

  // Validar campos vacíos
  if (n1 === "" || n2 === "") {
    document.getElementById("p1-output").textContent = "❌ Por favor ingresa ambos números.";
    if (n1 === "") document.getElementById("p1-num1").focus();
    else document.getElementById("p1-num2").focus();
    return;
  }

  n1 = Number(n1);
  n2 = Number(n2);

  // Validar que sean números válidos
  if (isNaN(n1) || isNaN(n2)) {
    document.getElementById("p1-output").textContent = "❌ Por favor ingresa números válidos.";
    return;
  }

  var resultado;
  var operacion;

  if (n1 === n2) {
    resultado = n1 * n2;
    operacion = "multiplicación";
  } else if (n1 > n2) {
    resultado = n1 - n2;
    operacion = "resta";
  } else {
    resultado = n1 + n2;
    operacion = "suma";
  }

  document.getElementById("p1-output").textContent = 
    `✅ Resultado (${operacion}):\n${n1} ${n1 === n2 ? '×' : (n1 > n2 ? '-' : '+')} ${n2} = ${resultado}`;
}

//  PROBLEMA 2
function problema2() {
  var n1 = document.getElementById("p2-num1").value.trim();
  var n2 = document.getElementById("p2-num2").value.trim();
  var n3 = document.getElementById("p2-num3").value.trim();

  // Validar campos vacíos
  if (n1 === "" || n2 === "" || n3 === "") {
    document.getElementById("p2-output").textContent = "❌ Por favor ingresa los tres números.";
    if (n1 === "") document.getElementById("p2-num1").focus();
    else if (n2 === "") document.getElementById("p2-num2").focus();
    else document.getElementById("p2-num3").focus();
    return;
  }

  n1 = Number(n1);
  n2 = Number(n2);
  n3 = Number(n3);

  // Validar que sean números válidos
  if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
    document.getElementById("p2-output").textContent = "❌ Por favor ingresa números válidos.";
    return;
  }

  // Validar que sean diferentes
  if (n1 === n2 || n1 === n3 || n2 === n3) {
    document.getElementById("p2-output").textContent = "❌ Los 3 números deben ser diferentes";
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

  document.getElementById("p2-output").textContent = 
    `✅ El número mayor es: ${mayor}\n\nNúmeros ingresados: ${n1}, ${n2}, ${n3}`;
}

//  PROBLEMA 3
function problema3() {
  var horasVal = document.getElementById("p3-horas").value.trim();
  var salarioVal = document.getElementById("p3-salario").value.trim();

  // Validar campos vacíos
  if (horasVal === "" || salarioVal === "") {
    document.getElementById("p3-output").textContent = "❌ Por favor ingresa las horas y el salario por hora.";
    if (horasVal === "") document.getElementById("p3-horas").focus();
    else document.getElementById("p3-salario").focus();
    return;
  }

  var horas = parseFloat(horasVal);
  var salario = parseFloat(salarioVal);

  // Validar números válidos
  if (isNaN(horas) || isNaN(salario)) {
    document.getElementById("p3-output").textContent = "❌ Por favor ingresa valores numéricos válidos.";
    return;
  }

  // Validar valores positivos
  if (horas < 0 || salario < 0) {
    document.getElementById("p3-output").textContent = "❌ Las horas y el salario deben ser valores positivos.";
    return;
  }

  var pagoTotal = 0;
  var horasNormales = 0;
  var horasDobles = 0;
  var horasTriples = 0;

  if (horas <= 40) {
    horasNormales = horas;
    pagoTotal = horas * salario;
  } else {
    horasNormales = 40;
    var extras = horas - 40;
    if (extras <= 8) {
      horasDobles = extras;
      pagoTotal = (40 * salario) + (extras * salario * 2);
    } else {
      horasDobles = 8;
      horasTriples = extras - 8;
      pagoTotal = (40 * salario) + (8 * salario * 2) + ((extras - 8) * salario * 3);
    }
  }

  var detalle = `✅ Pago total: $${pagoTotal.toFixed(2)}\n\nDesglose:\n`;
  detalle += `- Horas normales (${horasNormales}h): $${(horasNormales * salario).toFixed(2)}\n`;
  if (horasDobles > 0) detalle += `- Horas extras x2 (${horasDobles}h): $${(horasDobles * salario * 2).toFixed(2)}\n`;
  if (horasTriples > 0) detalle += `- Horas extras x3 (${horasTriples}h): $${(horasTriples * salario * 3).toFixed(2)}`;

  document.getElementById("p3-output").textContent = detalle;
}

// PROBLEMA 4
function problema4() {
    var salarioVal = document.getElementById("p4-salario").value.trim();
    var antiguedadVal = document.getElementById("p4-antiguedad").value.trim();

    // Validar campos vacíos
    if (salarioVal === "" || antiguedadVal === "") {
        document.getElementById("p4-output").textContent = "❌ Por favor ingresa el salario y la antigüedad.";
        if (salarioVal === "") document.getElementById("p4-salario").focus();
        else document.getElementById("p4-antiguedad").focus();
        return;
    }

    var salario = parseFloat(salarioVal);
    var antiguedad = parseFloat(antiguedadVal);

    // Validar números válidos
    if (isNaN(salario) || isNaN(antiguedad)) {
        document.getElementById("p4-output").textContent = "❌ Por favor ingresa valores numéricos válidos.";
        return;
    }

    // Validar valores positivos
    if (salario < 0 || antiguedad < 0) {
        document.getElementById("p4-output").textContent = "❌ El salario y la antigüedad deben ser valores positivos.";
        return;
    }

    var porcentaje = 0;
    var rango = "";

    if (antiguedad < 1) {
        porcentaje = 0.05;
        rango = "menos de 1 año";
    } else if (antiguedad >= 1 && antiguedad < 2) {
        porcentaje = 0.07;
        rango = "1 a 2 años";
    } else if (antiguedad >= 2 && antiguedad < 5) {
        porcentaje = 0.10;
        rango = "2 a 5 años";
    } else if (antiguedad >= 5 && antiguedad < 10) {
        porcentaje = 0.15;
        rango = "5 a 10 años";
    } else {
        porcentaje = 0.20;
        rango = "10 años o más";
    }

    var utilidad = salario * porcentaje;

    document.getElementById("p4-output").textContent = 
        `✅ La utilidad anual es: $${utilidad.toFixed(2)}\n\nDetalles:\n` +
        `- Salario mensual: $${salario.toFixed(2)}\n` +
        `- Antigüedad: ${antiguedad} años (${rango})\n` +
        `- Porcentaje aplicado: ${(porcentaje * 100).toFixed(0)}%`;
}
