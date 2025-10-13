function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;

    var patron = /[0-9\d.]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularDescuento() {
    var valor = document.getElementById("total").value;
    var monto = parseFloat(valor);

    if (isNaN(monto) || monto <= 0) {
        alert("Por favor ingresa una cantidad válida.");
        return;
    }

    var descuento = monto * 0.15;
    var totalFinal = monto - descuento;

    document.getElementById("resultado").value = "$ " + totalFinal.toFixed(2);
}

function borrarDatos() {
    document.getElementById("resultado").value = "";
    document.getElementById("total").value = "";
}
