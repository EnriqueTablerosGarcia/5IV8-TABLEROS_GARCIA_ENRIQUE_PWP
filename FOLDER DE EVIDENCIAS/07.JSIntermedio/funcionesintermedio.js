/*

Java script maneja variables del sigueinte modo:


Var - una variable de acceso local y global dependiendo de donde se declare

let - es una  variable protegida, solo se puede hacer uso dentro de la funcion o bloque donde se declara

const - es una variable que no puede cambiar su valor, es una variable 

var x = "hola";
if(true){

let x = "había una vez";
}

console.log(x);



function suma (n1,n2){
return n1+n2;
    
}
console.log (` Esta suma es de:  ${suma (5,3)}`); 
const suma = (n1,n2) => n1+n2;

console.log (` Esta suma es de:  ${suma (5,3)}`); 

*/
// como usamos las funciones

// comilla al revés 

// las funciones flehca, nos ayudan a poder realizar operaciones de una forma mucho más sencilla, de acuerdo a la siguiente estructura

// "cadena"  - id, clase, metodo, nombre, atributo


const razasdePerros =[


    "Pastor Aleman ",
 "Labrador Retriever",
"Salchicha",
"Pug",
"Dalmata",
"Beagle",
"Chihuaha",
"Elgatoarranca"



]
/*
for (let i=0; i < razasdePerros.length; i++){
console.log(razasdePerros[i]);    
}


//for of
for(const raza of razasdePerros){
    console.log(raza);
}



//for in
for (const indice in razasdePerros){
console.log(razasdePerros[indice])

}
*/
// for each itera sobre los elementos del arreglo y no devuelve nada 
// todos los forEach, son funciones flecha por defecto razasdePerros.array.forEach(raza => console.log (raza) ); 


// argumento.forEach((raza,indice,arreglo)) => {codigo a ejecutar} razasdePerros.forEach((raza,indice,razasdePerros) => console.log(raza));




// F map - iterar sobre los elementos del arreglo, y regresa a un arreglo diferente con el cual podemos jugar const razasDePerros = razasdePerros.map (raza=> raza.toUpperCase());
//console.log (razasDePerros)



//FIND - Nos permite realizar una busqueda de un elemento dentro del arreglo si lo encunetra, lo retorna , sino lanza un undefined
/*
if(razasdePerros.find(raza=> raza === "Chihuaha")){
    console.log("si se encontro la raza")
    console.log(razasdePerros)
} else{

    razasdePerros.push("Chihuaha");
    console.log (razasdePerros);
}
    */
   
//FIND INDEX - nos permite realizar una busqueda de un elemento dentro del arreglo, si lo encuentra, regresa el indice del elemenento, sino regresa un -1, esta funcion esparticularmente util cuando necesiatamos modificar o eliminar de un arreglo original, dentro de una copia del mismo


const indiceChihuahua = razasdePerros.findIndex (raza => raza === "Chihuahua")

if (indiceChihuahua>-1){

    console.log (razasdePerros[indiceChihuahua]);
    razasdePerros[indiceChihuahua] += "(Es una raza de perros chiquita y chillona)"

    console.log(razasdePerros[indiceChihuahua]);
    console.log(razasdePerros);
}


