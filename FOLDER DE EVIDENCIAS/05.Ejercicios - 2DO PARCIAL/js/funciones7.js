
function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true; // backspace
    if (teclado == 13) return true; // enter
    var patron = /[0-9]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularEdad() {
    var anioVal = document.getElementById("anioNacimiento").value.trim();

    // Validar campo vacío
    if (anioVal === "") {
        alert("Por favor ingresa tu año de nacimiento.");
        document.getElementById("anioNacimiento").focus();
        return;
    }

    var anio = parseInt(anioVal);
    var fechaActual = new Date();
    var anioActual = fechaActual.getFullYear();

    // Validar número y rango
    if (isNaN(anio) || anio > anioActual || anio < 1900) {
        alert("Por favor, ingresa un año de nacimiento válido (entre 1900 y " + anioActual + ").");
        document.getElementById("anioNacimiento").focus();
        return;
    }

    var edad = anioActual - anio;

    document.getElementById("edad").value = edad + " años";
}

function borrarDatos() {
    document.getElementById("anioNacimiento").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("anioNacimiento").focus();
}
