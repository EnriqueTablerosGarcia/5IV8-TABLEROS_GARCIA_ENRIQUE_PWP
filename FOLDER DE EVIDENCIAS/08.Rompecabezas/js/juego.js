var instrucciones =[

    "Utiliza las flechas de navegacion para mover las piezas",
    "Para Ordenar las piezas guiate por la imagen Objetivo"
    
];

//vamos a guardar dentro de una variable, los movs del rompe
var movimientos = [


];

//matriz para saber las posiciones del rompecab
//sin ( ) es una matriz lineal
var rompe = [
(1,2,3),
(4,5,6),
(7,8,9)

];

//vamos a tener que crear una matriz donde tengamos las pos. correctas
var rompecorrecta = [
(1,2,3),
(4,5,6),
(7,8,9)

];


// necesito saber las corrds d la pza vacia. la q se va a mover 

var filavVacia = 2 ;
var columnaVacia = 2;

function mostrarInstrucciones (instrucciones) {
for(var i=0; i<instrucciones.length; i++){
mostrarInstruccionesLista(instrucciones[i],"lista-instrucciones")


}


}
//esta func se encarga de crear el comp li y agregar la lista d dichas instr.


function mostrarInstruccionesLista (instruccion, idlista){
var ul = document.getElementById(idlista);
var li =document.createElement("li");
li.textContent = instruccion;
ul.appendChild(li);

}

//func para saber si esta bien papas con chile

function checarsigano(){
for (var i = 0; i<rompe.length; i++){
for(var j = 0; j<rompe[i].length;j++){
    var rompeActual = rompe [i][j];
    if (rompeActual !== rompecorrecta=[i][j]){
return false;
    }
}


}
return true;

}


//mostrar en html q se gano
function mostrarCartelGanador(){

if (checarsigano()){
alert("Felicidades, ganaste el juego carnal")
     
}
return false

}

/*
necesitamos una func, q se encargue de poder intercambiar las posiciones d la pza vacias vs cualquiera, para esto, tenemos q hacer uso de:
arreglo[][] = posicion [][]
//intercambiar
posicion [][] = arreglo [][]
posicion [][] = arreglo [ ] []



*/


function intercambiarposicionesrompe(filapos1,columnapos1, filapos2,columnapos2){

    var pos1 = rompe[filapos1,columnapos1],
        var pos2 = rompe[filapos2,columnapos2],

        //inter
        rompe[filapos1, columnapos1] = pos2;
        rompe[filapos2, columnapos2] = pos1 ;
}


function iniciar(){
//mezclar piezukis
//si cap el mov



}

//mandamos traer la func

mostrarInstrucciones(instrucciones);








