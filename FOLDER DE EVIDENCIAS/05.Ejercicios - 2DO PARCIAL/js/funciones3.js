
function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true; 
    var patron = /[0-9.]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}


function calcular() {
    var sueldo = parseFloat(document.getElementById("sueldo").value);
    var v1 = parseFloat(document.getElementById("venta1").value);
    var v2 = parseFloat(document.getElementById("venta2").value);
    var v3 = parseFloat(document.getElementById("venta3").value);

    
    if (isNaN(sueldo) || isNaN(v1) || isNaN(v2) || isNaN(v3)) {
        alert("Por favor, ingrese valores numéricos válidos en todos los campos.");
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
}
