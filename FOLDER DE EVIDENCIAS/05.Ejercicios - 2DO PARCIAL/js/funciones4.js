function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true; // backspace
    if (teclado == 13) return true; // enter

    var patron = /[0-9.]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularDescuento() {
    var valor = document.getElementById("total").value.trim();

    // Validar campo vacío
    if (valor === "") {
        alert("Por favor ingresa el total de la compra.");
        document.getElementById("total").focus();
        return;
    }

    var monto = parseFloat(valor);

    // Validar número válido
    if (isNaN(monto) || monto <= 0) {
        alert("Por favor ingresa una cantidad válida mayor a 0.");
        document.getElementById("total").focus();
        return;
    }

    var descuento = monto * 0.15;
    var totalFinal = monto - descuento;

    document.getElementById("resultado").value = "$ " + totalFinal.toFixed(2);
}

function borrarDatos() {
    document.getElementById("resultado").value = "";
    document.getElementById("total").value = "";
    document.getElementById("total").focus();
}
