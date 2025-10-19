// ---------------- PROBLEMA 1 ----------------
function problema1() {
  var texto = document.getElementById("p1-input").value.trim();

  if (texto === "") {
    document.getElementById("p1-output").textContent = "Por favor ingresa algunas palabras.";
    return;
  }

  var palabras = texto.split(" ");
  var invertido = palabras.reverse().join(" ");
  document.getElementById("p1-output").textContent = invertido;
}

// ---------------- PROBLEMA 2 ----------------
function problema2() {

  var v1 = [
    parseFloat(document.getElementById("p2-x1").value) || 0,
    parseFloat(document.getElementById("p2-x2").value) || 0,
    parseFloat(document.getElementById("p2-x3").value) || 0,
    parseFloat(document.getElementById("p2-x4").value) || 0,
    parseFloat(document.getElementById("p2-x5").value) || 0
  ];

  var v2 = [
    parseFloat(document.getElementById("p2-y1").value) || 0,
    parseFloat(document.getElementById("p2-y2").value) || 0,
    parseFloat(document.getElementById("p2-y3").value) || 0,
    parseFloat(document.getElementById("p2-y4").value) || 0,
    parseFloat(document.getElementById("p2-y5").value) || 0
  ];


  v1.sort((a, b) => a - b);
  v2.sort((a, b) => b - a);

  var producto = 0;
  for (var i = 0; i < v1.length; i++) {
    producto += v1[i] * v2[i];
  }

  document.getElementById("p2-output").textContent = `El producto escalar mínimo es: ${producto}`;
}

// ---------------- PROBLEMA 3 ----------------
function problema3() {
  var texto = document.getElementById("p3-input").value.trim();

  if (texto === "") {
    document.getElementById("p3-output").textContent = "Por favor ingresa algunas palabras.";
    return;
  }

  var palabras = texto.split(",");
  var maxUnicos = 0;
  var palabraMax = "";

  palabras.forEach(function (palabra) {
    var soloLetras = palabra.toUpperCase().replace(/[^A-Z]/g, "");
    var unicos = new Set(soloLetras);

    if (unicos.size > maxUnicos) {
      maxUnicos = unicos.size;
      palabraMax = palabra;
    }
  });

  document.getElementById("p3-output").textContent =
    `Palabra con más caracteres únicos: ${palabraMax} (${maxUnicos} caracteres únicos)`;
}
