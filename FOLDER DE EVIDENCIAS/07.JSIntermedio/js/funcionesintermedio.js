/*
JS maneja variables del siguiente modo:
var -> una variable de aceso local y global dependiendo de donde se declare
let -> es una variable "protegida", solo se puede hacer uso dentro de la funcion o bloque donde se declara
const -> es una variable que npo puede cambiar su valor, es una constante 


var x = "hola";
var se puede sobreescribir tantas veces como sea necesario

if(true){
    let x = "habia una vez";
    console.log(x);
}

//como usamos las funciones

function suma(n1,n2){
    return n1+n2;
}

//`` sirven para poder modificar
console.log(Esta suma es de: ${suma(5,2)});

//las funciones flecha nos ayudan a poder realizar operaciones de una forma mucho mas sencilla, de acuerdo a la siguiente estructura
//"cadena" => id, clase, metodo, nombre, atributo, lo que sea dentro de los parametros

const suma = (n1,n2) => n1 + n2;
//es una funcion anonima porque no tiene nombre
console.log(Esta suma es de: ${suma(5,2)});

*/

const razasdPerros = [
    "Pastor Aleman",
    "Labrador Retriever",
    "Bulldog Frances",
    "Chihuahua",
    "Beagle",
    "Dalmata",
    "Salchicha",
    "Pug"
];


//formas de recorrer e imprimir un arreglo

//for
/*
for(let i = 0; i < razasdPerros.length; i++){
    console.log(razasdPerros[i])
}


//for of
for(const raza of razasdPerros){
    console.log(raza)
}

//for in
for(const indice in razasdPerros){
    console.log(razasdPerros[indice])
}


//for each
//itera por los elementos del arreglo pero no devuelve nada
//todos los for each son funciones flecha x defecto

razasdPerros.forEach(raza => console.log(raza));

//la estructura general del for each es la sig.
// argumento.forEach((raza[o variable], indice, arreglo) => (lo que se quiera ejecutar))

razasdPerros.forEach((raza,indice,razasdPerros) => console.log(raza));


//funcion MAP -> Iterar sobre los elementos del arreglo y regresa un arreglo diferente con el cual podeos jugar

const razasdPerrosMayusculas = razasdPerros.map(raza => raza.toUpperCase());
//con map se crea una copia del arreglo
//por lo regular se usa para ahorrar recursos
console.log(razasdPerrosMayusculas);


//FIND -> nos permite realizar una busqueda de un elemento dentro de un arreglo, si lo encuentra lo retorna, si no regresa un "undefined"

if(razasdPerros.find(raza => raza === "Chihuahua")){
    console.log("Si se encontro la raza");
    console.log(razasdPerros);
}else{
    //hay q meterlo
    razasdPerros.push('Chihuahua');
    console.log(razasdPerros);
}
*/

//FINDINDEX -> Permite realizar una busqueda dentro del arreglo, si lo encuentra regresa el indice del elemento si no, regresa un -1, 
// esta funcion es particularmente util cuando necesitamos modificar o eliminar de un arreglo original dentro de una copia del mismo

const indiceChihuahua = razasdPerros.findIndex(raza => raza === 'Chihuahua');

if(indiceChihuahua > -1){
    //si se encontro y esta dentro del arreglo
    console.log(razasdPerros[indiceChihuahua]);
    //aparte le voy a decir que agregue un texto a este resultado
    razasdPerros[indiceChihuahua]  += "(Es una raza de perros chiquita y chillonaa)";
    console.log(razasdPerros[indiceChihuahua]);
    console.log(razasdPerros);
}