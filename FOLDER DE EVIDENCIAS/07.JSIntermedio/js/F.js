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
