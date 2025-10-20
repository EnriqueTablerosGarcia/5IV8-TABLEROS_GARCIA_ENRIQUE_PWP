document.getElementById("formulario").addEventListener("submit", function(e) {
  e.preventDefault();

  let num1 = document.getElementById("num1").value;
  let num2 = document.getElementById("num2").value;
  let resultado = document.getElementById("resultado");

  if (num1 === "" || num2 === "") {
    resultado.textContent = "Debes ingresar ambos números.";
    return;
  }

  num1 = Number(num1);
  num2 = Number(num2);

  let res;

  if (num1 === num2) {
    res = num1 * num2;
  } else if (num1 > num2) {
    res = num1 - num2;
  } else {
    res = num1 + num2;
  }

  resultado.textContent = "Resultado: " + res;
});
