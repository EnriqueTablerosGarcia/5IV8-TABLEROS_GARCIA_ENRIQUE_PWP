
function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true; // backspace
    if (teclado == 13) return true; // enter
    var patron = /[0-9.]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}


function calcular() {
    var sueldoVal = document.getElementById("sueldo").value.trim();
    var v1Val = document.getElementById("venta1").value.trim();
    var v2Val = document.getElementById("venta2").value.trim();
    var v3Val = document.getElementById("venta3").value.trim();

    // Validar campos vacíos
    if (sueldoVal === "" || v1Val === "" || v2Val === "" || v3Val === "") {
        alert("Por favor complete todos los campos.");
        return;
    }

    var sueldo = parseFloat(sueldoVal);
    var v1 = parseFloat(v1Val);
    var v2 = parseFloat(v2Val);
    var v3 = parseFloat(v3Val);

    // Validar valores numéricos
    if (isNaN(sueldo) || isNaN(v1) || isNaN(v2) || isNaN(v3)) {
        alert("Por favor, ingrese valores numéricos válidos en todos los campos.");
        return;
    }

    // Validar valores positivos
    if (sueldo < 0 || v1 < 0 || v2 < 0 || v3 < 0) {
        alert("Los valores no pueden ser negativos.");
        return;
    }

    var totalVentas = v1 + v2 + v3;
    var comision = totalVentas * 0.10;
    var total = sueldo + comision;

    document.getElementById("comision").value = "$ " + comision.toFixed(2);
    document.getElementById("total").value = "$ " + total.toFixed(2);
}

function borrar() {
    document.getElementById("sueldo").value = "";
    document.getElementById("venta1").value = "";
    document.getElementById("venta2").value = "";
    document.getElementById("venta3").value = "";
    document.getElementById("comision").value = "";
    document.getElementById("total").value = "";
    document.getElementById("sueldo").focus();
}
