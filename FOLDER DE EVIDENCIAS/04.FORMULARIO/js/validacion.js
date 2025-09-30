// Validación adicional para nombre con espacios y edad positiva
function validarNombreYEdad(nombre, edad) {
    // Permitir letras y espacios en el nombre
    var nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (!nombreRegex.test(nombre.trim())) {
        alert("El nombre solo debe contener letras y espacios");
        return false;
    }
    // Edad debe ser número positivo y razonable (1-120)
    var edadNum = parseInt(edad, 10);
    if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
        alert("Por favor, ingrese una edad válida entre 1 y 120");
        return false;
    }
    return true;
}
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



    // Validación nombre: solo letras y espacios, permite nombres como "Jaime Minor Gomez"
    var nombre = formulario.nombre.value.trim();
    var nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (!nombreRegex.test(nombre)) {
        alert("El nombre solo debe contener letras y espacios");
        formulario.nombre.focus();
        return false;
    }

    // Validación edad: debe ser número positivo y razonable (1-120)
    var edad = formulario.edad.value.trim();
    var edadNum = parseInt(edad, 10);
    if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
        alert("Por favor, ingrese una edad válida entre 1 y 120");
        formulario.edad.focus();
        return false;
    }

    // Validación correo electrónico básica
    var correo = formulario.correo.value.trim();
    var correoRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!correoRegex.test(correo)) {
        alert("Por favor, ingrese un correo electrónico válido");
        formulario.correo.focus();
        return false;
    }


    return true;
}
