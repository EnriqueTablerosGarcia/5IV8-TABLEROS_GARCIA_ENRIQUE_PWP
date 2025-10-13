
function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularEdad() {
    var anio = parseInt(document.getElementById("anioNacimiento").value);
    var fechaActual = new Date();
    var anioActual = fechaActual.getFullYear();

    if (isNaN(anio) || anio > anioActual || anio < 1900) {
        alert("Por favor, ingresa un año de nacimiento válido.");
        return;
    }

    var edad = anioActual - anio;

    document.getElementById("edad").value = edad;
}

function borrarDatos() {
    document.getElementById("anioNacimiento").value = "";
    document.getElementById("edad").value = "";
}
