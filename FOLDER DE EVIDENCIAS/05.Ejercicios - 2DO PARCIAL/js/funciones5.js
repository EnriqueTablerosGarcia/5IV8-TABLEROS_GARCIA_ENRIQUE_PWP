function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true; // backspace
    if (teclado == 13) return true; // enter

    var patron = /[0-9.]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularFinal() {
    var p1Val = document.getElementById("parcial1").value.trim();
    var p2Val = document.getElementById("parcial2").value.trim();
    var p3Val = document.getElementById("parcial3").value.trim();
    var examenVal = document.getElementById("examen").value.trim();
    var trabajoVal = document.getElementById("trabajo").value.trim();

    // Validar campos vacíos
    if (p1Val === "" || p2Val === "" || p3Val === "" || examenVal === "" || trabajoVal === "") {
        alert("Por favor complete todos los campos.");
        return;
    }

    var p1 = parseFloat(p1Val);
    var p2 = parseFloat(p2Val);
    var p3 = parseFloat(p3Val);
    var examen = parseFloat(examenVal);
    var trabajo = parseFloat(trabajoVal);

    // Validar números
    if ([p1, p2, p3, examen, trabajo].some(isNaN)) {
        alert("Por favor, ingresa todas las calificaciones correctamente.");
        return;
    }

    // Validar rango de calificaciones (0-10)
    if (p1 < 0 || p1 > 10 || p2 < 0 || p2 > 10 || p3 < 0 || p3 > 10 || 
        examen < 0 || examen > 10 || trabajo < 0 || trabajo > 10) {
        alert("Las calificaciones deben estar entre 0 y 10.");
        return;
    }

    var promedioParciales = (p1 + p2 + p3) / 3;
    var calificacionFinal = (promedioParciales * 0.55) + (examen * 0.30) + (trabajo * 0.15);

    document.getElementById("resultado").value = calificacionFinal.toFixed(2);

    // Mensajes según calificación
    if (calificacionFinal < 6) {
        alert("Ya no carnal Pulpo");
    } else if (calificacionFinal >= 7) {
        alert("mondongo");
    } else {
        alert("Vive, vive, muere?");
    }
}

function borrarDatos() {
    document.getElementById("parcial1").value = "";
    document.getElementById("parcial2").value = "";
    document.getElementById("parcial3").value = "";
    document.getElementById("examen").value = "";
    document.getElementById("trabajo").value = "";
    document.getElementById("resultado").value = "";
    document.getElementById("parcial1").focus();
}
