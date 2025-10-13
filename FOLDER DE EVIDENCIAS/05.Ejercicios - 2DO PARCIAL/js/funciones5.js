function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;

    var patron = /[0-9\d.]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularFinal() {
   
    var p1 = parseFloat(document.getElementById("parcial1").value);
    var p2 = parseFloat(document.getElementById("parcial2").value);
    var p3 = parseFloat(document.getElementById("parcial3").value);
    var examen = parseFloat(document.getElementById("examen").value);
    var trabajo = parseFloat(document.getElementById("trabajo").value);

  
    if ([p1, p2, p3, examen, trabajo].some(isNaN)) {
        alert("Por favor, ingresa todas las calificaciones correctamente.");
        return;
    }

  
    var promedioParciales = (p1 + p2 + p3) / 3;
    var calificacionFinal = (promedioParciales * 0.55) + (examen * 0.30) + (trabajo * 0.15);

    
    document.getElementById("resultado").value = calificacionFinal.toFixed(2);

  
    if (calificacionFinal < 6) {
        alert("Ya no carnal Pulpo😭");
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
}
