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
