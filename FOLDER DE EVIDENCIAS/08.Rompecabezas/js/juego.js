// Instrucciones del juego
var instrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas.",
    "Para ordenar las piezas guiate por la imagen objetivo."
];




// Guardar movimientos
var movimientos = [];

// Matriz del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Matriz correcta (meta)
var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Coordenadas de la pieza vacía (posición inicial)
var filaVacia = 2;
var columnaVacia = 2;

// Mostrar instrucciones en HTML
function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionesLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

// Verificar si el jugador ganó
function checarSiGano() {
    for (var i = 0; i < rompe.length; i++) {
        for (var j = 0; j < rompe[i].length; j++) {
            var rompeActual = rompe[i][j];
            if (rompeActual !== rompeCorrecta[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// Mostrar cartel ganador
function mostrarCartelGanador() {
    if (checarSiGano()) {
        alert("¡Felicidades, ganaste el juego!");
    }
}

// Intercambiar posiciones dentro de la matriz
function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    // ERROR CORREGIDO: se usaban comas en vez de corchetes
    var temp = rompe[filaPos1][columnaPos1];
    rompe[filaPos1][columnaPos1] = rompe[filaPos2][columnaPos2];
    rompe[filaPos2][columnaPos2] = temp;
}

// Actualizar coordenadas de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

// Validar si la posición está dentro del tablero
function posicionValida(fila, columna) {
    return fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2;
}

// Códigos de dirección de las flechas
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
};

// Mover la pieza vacía según la tecla presionada
function moverEnDireccion(direccion) {
    var nuevaFilaPiezaVacia = filaVacia;
    var nuevaColumnaPiezaVacia = columnaVacia;

    if (direccion === codigosDireccion.ABAJO) {
        nuevaFilaPiezaVacia = filaVacia + 1;
    } else if (direccion === codigosDireccion.ARRIBA) {
        nuevaFilaPiezaVacia = filaVacia - 1;
    } else if (direccion === codigosDireccion.DERECHA) {
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    } else if (direccion === codigosDireccion.IZQUIERDA) {
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }

    // Validar posición
    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        // Intercambiar posiciones
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarUltimoMovimiento(direccion);
    }
}

// Intercambiar posiciones en matriz y DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    // == uso correcto de [ ] en lugar de comas
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

// Intercambiar posiciones en el DOM
function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);

    // == variables mal escritas (elementoPieza1 → pieza1) este es e,l error
    var padre = pieza1.parentNode;

    // Clonar piezas
    var clon1 = pieza1.cloneNode(true);
    var clon2 = pieza2.cloneNode(true);

    // Reemplazar en el DOM
    padre.replaceChild(clon1, pieza2);
    padre.replaceChild(clon2, pieza1);
}

// Actualizar el último movimiento mostrado
function actualizarUltimoMovimiento(direccion) {
    var ultimoMovimiento = document.getElementById("flecha");
    switch (direccion) {
        case codigosDireccion.ARRIBA:
            ultimoMovimiento.textContent = "↑";
            break;
        case codigosDireccion.ABAJO:
            ultimoMovimiento.textContent = "↓";
            break;
        case codigosDireccion.DERECHA:
            ultimoMovimiento.textContent = "→";
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMovimiento.textContent = "←";
            break;
    }
}

// Mezclar piezas aleatoriamente
function mezclarPiezas(veces) {
    if (veces <= 0) {
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];
    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];

    moverEnDireccion(direccion);

    setTimeout(function () {
        mezclarPiezas(veces - 1);
    }, 100);
}

// Capturar teclas presionadas
function capturarTeclas() {
    document.body.onkeydown = function (evento) {
        if (evento.which === codigosDireccion.ARRIBA ||
            evento.which === codigosDireccion.ABAJO ||
            evento.which === codigosDireccion.DERECHA ||
            evento.which === codigosDireccion.IZQUIERDA) {

            moverEnDireccion(evento.which);

            if (checarSiGano()) {
                setTimeout(function () {
                    mostrarCartelGanador();
                }, 500);
            }

            evento.preventDefault();
        }
    };
}



// Inicializar el juego
function iniciar() {
    mezclarPiezas(30);
    capturarTeclas();
    mostrarInstrucciones(instrucciones);
}

function intercambiar() {
    mezclarPiezas(30);
    capturarTeclas();
}

iniciar();


//mandamos traer a la funcion
mostrarInstrucciones(instrucciones);