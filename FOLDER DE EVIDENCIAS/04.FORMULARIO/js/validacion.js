/*
enma script
Javascript es un lenguaje multiparadigma
Acepta la programación funcional, estructurada, POO, Eventos

Dentro de Js, no existe el typado de variables; int, string, etc
Solo existen 3 tipos de varibles de acuerdo al estandar ES6: let, const y var
*/

function validar(formulario) {
 
    //quiero validar que el campo nombre acepte más de 3 caracteres

    if (formulario.nombre.value.length < 4) {

        alert("Por favor, escribe más de 3 caracteres en el campo nombre");
        formulario.nombre.focus();
        return false;
    
    
    }



    //validacion unicamente letras
    var checStr = formulario.nombre.value;
    alert(checStr);

    var abcOK = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ '; 
    var aliValido = true;
    //tememos que comparar la cadena de nombre vs abc

    for (var i = 0; i < checStr.length; i++) {
        var caracteres = checStr.charAt(i);
        for (var j = 0; j < abcOK.length; j++) {
            if (caracteres == abcOK.charAt(j)) break;
        }
        if (j == abcOK.length) {
            aliValido = false;
            break;
        }
    
     }
     if (!aliValido) { alert("Escriba unicamente letras en el campo nombre"); formulario.nombre.focus(); return false;
    }

     if (!aliValido) { alert("Escriba unicamente digitos en el campo nombre"); formulario.edad.focus(); return false;

    }

    //vamos a crear una funcion de una expresion regular para validar el correo electronico
    //texto.texto@texto.texto

    var b = /^[^@\s]+[^@\.\s]+(\.[^@\.\s]+)+$/; 
    var txt = formulario.correo.value;

alert("Email" + (b.test(txt)? " " : " no válido") + ("valido"));

return b.test;

}
