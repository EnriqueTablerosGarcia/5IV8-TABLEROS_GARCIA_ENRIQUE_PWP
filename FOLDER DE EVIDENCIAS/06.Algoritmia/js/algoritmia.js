//  PROBLEMA 1 
function problema1() {
  var texto = document.getElementById("p1-input").value.trim();

  // Validar campo vacío
  if (texto === "") {
    document.getElementById("p1-output").textContent = " Por favor ingresa algunas palabras.";
    document.getElementById("p1-input").focus();
    return;
  }

  // Validar que tenga al menos una palabra
  if (texto.split(" ").filter(p => p !== "").length === 0) {
    document.getElementById("p1-output").textContent = " No se encontraron palabras válidas.";
    document.getElementById("p1-input").focus();
    return;
  }

  var palabras = texto.split(" ");
  var invertido = palabras.reverse().join(" ");
  document.getElementById("p1-output").textContent = "✅ Resultado:\n" + invertido;
}

// PROBLEMA 2 
function problema2() {
  // Obtener todos los valores
  var x1 = document.getElementById("p2-x1").value.trim();
  var x2 = document.getElementById("p2-x2").value.trim();
  var x3 = document.getElementById("p2-x3").value.trim();
  var x4 = document.getElementById("p2-x4").value.trim();
  var x5 = document.getElementById("p2-x5").value.trim();
  var y1 = document.getElementById("p2-y1").value.trim();
  var y2 = document.getElementById("p2-y2").value.trim();
  var y3 = document.getElementById("p2-y3").value.trim();
  var y4 = document.getElementById("p2-y4").value.trim();
  var y5 = document.getElementById("p2-y5").value.trim();

  // Validar que todos los campos estén llenos
  if (x1 === "" || x2 === "" || x3 === "" || x4 === "" || x5 === "" ||
      y1 === "" || y2 === "" || y3 === "" || y4 === "" || y5 === "") {
    document.getElementById("p2-output").textContent = " Por favor completa todos los campos de ambos vectores.";
    return;
  }

  var v1 = [
    parseFloat(x1),
    parseFloat(x2),
    parseFloat(x3),
    parseFloat(x4),
    parseFloat(x5)
  ];

  var v2 = [
    parseFloat(y1),
    parseFloat(y2),
    parseFloat(y3),
    parseFloat(y4),
    parseFloat(y5)
  ];

  // Validar que todos sean números válidos
  if (v1.some(isNaN) || v2.some(isNaN)) {
    document.getElementById("p2-output").textContent = " Por favor ingresa solo números válidos en todos los campos.";
    return;
  }

  // Ordenar vectores para producto mínimo
  v1.sort((a, b) => a - b);
  v2.sort((a, b) => b - a);

  var producto = 0;
  for (var i = 0; i < v1.length; i++) {
    producto += v1[i] * v2[i];
  }

  document.getElementById("p2-output").textContent = 
    `✅ El producto escalar mínimo es: ${producto}\n\nVector1 ordenado: [${v1.join(", ")}]\nVector2 ordenado: [${v2.join(", ")}]`;
}

//  PROBLEMA 3 
function problema3() {
  var texto = document.getElementById("p3-input").value.trim();

  // Validar campo vacío
  if (texto === "") {
    document.getElementById("p3-output").textContent = " Por favor ingresa algunas palabras separadas por comas.";
    document.getElementById("p3-input").focus();
    return;
  }

  // Validar formato (debe tener comas)
  if (!texto.includes(",")) {
    document.getElementById("p3-output").textContent = " Por favor separa las palabras con comas (,) sin espacios.";
    document.getElementById("p3-input").focus();
    return;
  }

  var palabras = texto.split(",");
  
  // Validar que haya al menos una palabra
  var palabrasValidas = palabras.filter(p => p.trim() !== "");
  if (palabrasValidas.length === 0) {
    document.getElementById("p3-output").textContent = " No se encontraron palabras válidas.";
    document.getElementById("p3-input").focus();
    return;
  }

  var maxUnicos = 0;
  var palabraMax = "";

  palabras.forEach(function (palabra) {
    var palabraLimpia = palabra.trim();
    var soloLetras = palabraLimpia.toUpperCase().replace(/[^A-Z]/g, "");
    var unicos = new Set(soloLetras);

    if (unicos.size > maxUnicos) {
      maxUnicos = unicos.size;
      palabraMax = palabraLimpia;
    }
  });

  document.getElementById("p3-output").textContent =
    ` Palabra con más caracteres únicos:\n\n"${palabraMax}" tiene ${maxUnicos} caracteres únicos\n\nCaracteres: ${Array.from(new Set(palabraMax.toUpperCase().replace(/[^A-Z]/g, ""))).join(", ")}`;
}
