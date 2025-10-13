function problema1() { 
   
    var texto = document.getElementById("p1-input").value.trim();

    if (texto === "") {
        document.getElementById("p1-output").textContent = "Por favor ingresa algunas palabras.";
        return;
    }

    
    var palabras = texto.split(" ");
    var invertido = palabras.reverse().join(" ");

   
    document.getElementById("p1-output").textContent = invertido;
}




function problema2() { 

    
}
//jimmy



function problema3() {
    var texto = document.getElementById("p3-input").value.trim();

    if (texto === "") {
        document.getElementById("p3-output").textContent = "Por favor ingresa algunas palabras.";
        return;
    }


    var palabras = texto.split(",");

    var maxUnicos = 0;
    var palabraMax = "";

    palabras.forEach(function(palabra) {
  
        var soloLetras = palabra.toUpperCase().replace(/[^A-Z]/g, "");

      
        var unicos = new Set(soloLetras);

        if (unicos.size > maxUnicos) {
            maxUnicos = unicos.size;
            palabraMax = palabra;
        }
    });

    document.getElementById("p3-output").textContent = 
        "Palabra con más caracteres únicos: " + palabraMax + " (" + maxUnicos + " caracteres únicos)";
}
