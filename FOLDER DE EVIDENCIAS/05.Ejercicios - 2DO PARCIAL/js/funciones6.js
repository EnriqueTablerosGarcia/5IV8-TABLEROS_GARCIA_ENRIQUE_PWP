function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;

    var patron = /[0-9\d]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularPorcentajes() {
    var hombres = parseInt(document.getElementById("hombres").value);
    var mujeres = parseInt(document.getElementById("mujeres").value);

    if (isNaN(hombres) || isNaN(mujeres) || (hombres < 0) || (mujeres < 0)) {
        alert("Por favor, ingresa valores válidos para hombres y mujeres.");
        return;
    }

    var total = hombres + mujeres;

    if (total === 0) {
        alert("El grupo no puede tener 0 estudiantes.");
        return;
    }

    var porcH = (hombres * 100) / total;
    var porcM = (mujeres * 100) / total;

    document.getElementById("porcH").value = porcH.toFixed(2) + " %";
    document.getElementById("porcM").value = porcM.toFixed(2) + " %";
}

function borrarDatos() {
    document.getElementById("hombres").value = "";
    document.getElementById("mujeres").value = "";
    document.getElementById("porcH").value = "";
    document.getElementById("porcM").value = "";
}
