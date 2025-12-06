// Estado del juego
let estadoJuego = {
    // Estado de cada mini-tablero (0-8): null = vacío, 'X' = jugador 1, 'O' = jugador 2, 'ganado-X', 'ganado-O', 'empate'
    miniTableros: Array(9).fill(null).map(() => Array(9).fill(null)),
    // Estado ganado de cada mini-tablero: null, 'X', 'O', 'empate'
    estadoMiniTableros: Array(9).fill(null),
    // Estado del tablero principal (basado en mini-tableros ganados)
    tableroPrincipal: Array(9).fill(null),
    // Jugador actual: 'X' o 'O'
    jugadorActual: 'X',
    // Próximo mini-tablero donde se debe jugar (0-8 o null = cualquiera)
    tableroObligatorio: null,
    // Puntos
    puntosX: 0,
    puntosO: 0,
    // Estado del juego: 'jugando', 'finalizado'
    estado: 'jugando',
    ganador: null
};

// Inicializar el tablero
function inicializarTablero() {
    const tableroPrincipal = document.getElementById('tablero-principal');
    tableroPrincipal.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const miniTablero = document.createElement('div');
        miniTablero.className = 'mini-tablero';
        miniTablero.dataset.tablero = i;
        
        for (let j = 0; j < 9; j++) {
            const celda = document.createElement('div');
            celda.className = 'celda';
            celda.dataset.tablero = i;
            celda.dataset.celda = j;
            celda.addEventListener('click', () => manejarClick(i, j));
            miniTablero.appendChild(celda);
        }
        
        tableroPrincipal.appendChild(miniTablero);
    }
    
    actualizarTablerosActivos();
}

// Manejar click en una celda
function manejarClick(tablero, celda) {
    // Validaciones
    if (estadoJuego.estado !== 'jugando') return;
    if (estadoJuego.estadoMiniTableros[tablero] !== null) return; // Mini-tablero ya ganado
    if (estadoJuego.miniTableros[tablero][celda] !== null) return; // Celda ocupada
    if (estadoJuego.tableroObligatorio !== null && estadoJuego.tableroObligatorio !== tablero) return; // No es el tablero correcto
    
    // Realizar movimiento
    estadoJuego.miniTableros[tablero][celda] = estadoJuego.jugadorActual;
    actualizarCelda(tablero, celda);
    
    // Verificar si se ganó el mini-tablero
    const ganadorMini = verificarGanadorMiniTablero(tablero);
    if (ganadorMini) {
        estadoJuego.estadoMiniTableros[tablero] = ganadorMini;
        estadoJuego.tableroPrincipal[tablero] = ganadorMini;
        marcarMiniTableroGanado(tablero, ganadorMini);
        
        if (ganadorMini === 'X') {
            estadoJuego.puntosX += 10;
        } else if (ganadorMini === 'O') {
            estadoJuego.puntosO += 10;
        }
        actualizarPuntos();
        
        // Verificar si se ganó el juego principal
        const ganadorPrincipal = verificarGanadorPrincipal();
        if (ganadorPrincipal) {
            finalizarJuego(ganadorPrincipal);
            return;
        }
    }
    
    // Determinar próximo tablero obligatorio
    estadoJuego.tableroObligatorio = celda;
    // Si el tablero obligatorio ya está ganado, permitir jugar en cualquiera
    if (estadoJuego.estadoMiniTableros[estadoJuego.tableroObligatorio] !== null) {
        estadoJuego.tableroObligatorio = null;
    }
    
    // Cambiar turno
    estadoJuego.jugadorActual = estadoJuego.jugadorActual === 'X' ? 'O' : 'X';
    actualizarTurno();
    actualizarTablerosActivos();
}

// Actualizar celda visual
function actualizarCelda(tablero, celda) {
    const celdaElement = document.querySelector(`[data-tablero="${tablero}"][data-celda="${celda}"]`);
    celdaElement.textContent = estadoJuego.miniTableros[tablero][celda];
    celdaElement.classList.add('ocupada');
}

// Verificar ganador de un mini-tablero
function verificarGanadorMiniTablero(tablero) {
    const t = estadoJuego.miniTableros[tablero];
    const combinaciones = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];
    
    for (const combo of combinaciones) {
        if (t[combo[0]] && t[combo[0]] === t[combo[1]] && t[combo[0]] === t[combo[2]]) {
            return t[combo[0]];
        }
    }
    
    // Verificar empate
    if (t.every(cell => cell !== null)) {
        return 'empate';
    }
    
    return null;
}

// Verificar ganador del tablero principal
function verificarGanadorPrincipal() {
    const t = estadoJuego.tableroPrincipal;
    const combinaciones = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];
    
    for (const combo of combinaciones) {
        if (t[combo[0]] && t[combo[0]] === t[combo[1]] && t[combo[0]] === t[combo[2]] && t[combo[0]] !== 'empate') {
            return t[combo[0]];
        }
    }
    
    // Verificar empate (todos los mini-tableros decididos)
    if (estadoJuego.estadoMiniTableros.every(estado => estado !== null)) {
        return 'empate';
    }
    
    return null;
}

// Marcar mini-tablero como ganado
function marcarMiniTableroGanado(tablero, ganador) {
    const miniTablero = document.querySelector(`[data-tablero="${tablero}"].mini-tablero`);
    miniTablero.classList.add('ganado');
    miniTablero.classList.add(`ganado-${ganador}`);
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay-ganador';
    overlay.textContent = ganador === 'empate' ? '=' : ganador;
    miniTablero.appendChild(overlay);
}

// Actualizar tableros activos
function actualizarTablerosActivos() {
    const miniTableros = document.querySelectorAll('.mini-tablero');
    
    miniTableros.forEach((tablero, index) => {
        tablero.classList.remove('activo', 'inactivo');
        
        if (estadoJuego.estadoMiniTableros[index] !== null) {
            tablero.classList.add('inactivo');
        } else if (estadoJuego.tableroObligatorio === null || estadoJuego.tableroObligatorio === index) {
            tablero.classList.add('activo');
        } else {
            tablero.classList.add('inactivo');
        }
    });
}

// Actualizar turno
function actualizarTurno() {
    const turnoTexto = document.getElementById('turno-texto');
    const simboloTurno = document.getElementById('simbolo-turno');
    const nombre = estadoJuego.jugadorActual === 'X' ? JUGADOR1_NOMBRE : JUGADOR2_NOMBRE;
    
    turnoTexto.textContent = `Turno de ${nombre}`;
    simboloTurno.textContent = estadoJuego.jugadorActual;
}

// Actualizar puntos
function actualizarPuntos() {
    document.getElementById('puntos-x').textContent = estadoJuego.puntosX;
    document.getElementById('puntos-o').textContent = estadoJuego.puntosO;
}

// Finalizar juego
async function finalizarJuego(ganador) {
    estadoJuego.estado = 'finalizado';
    estadoJuego.ganador = ganador;
    
    // Bonus de 50 puntos al ganador
    if (ganador === 'X') {
        estadoJuego.puntosX += 50;
    } else if (ganador === 'O') {
        estadoJuego.puntosO += 50;
    }
    actualizarPuntos();
    
    // Mostrar modal
    const modal = document.getElementById('modal-resultado');
    const titulo = document.getElementById('resultado-titulo');
    const mensaje = document.getElementById('resultado-mensaje');
    
    if (ganador === 'empate') {
        titulo.textContent = '¡Empate!';
        mensaje.textContent = 'La partida ha terminado en empate.';
    } else {
        const nombreGanador = ganador === 'X' ? JUGADOR1_NOMBRE : JUGADOR2_NOMBRE;
        titulo.textContent = `¡${nombreGanador} ha ganado!`;
        mensaje.textContent = `${nombreGanador} ganó la partida con ${ganador === 'X' ? estadoJuego.puntosX : estadoJuego.puntosO} puntos.`;
    }
    
    document.getElementById('resultado-puntos-x').textContent = estadoJuego.puntosX;
    document.getElementById('resultado-puntos-o').textContent = estadoJuego.puntosO;
    
    modal.style.display = 'flex';
    
    // Guardar resultado en la base de datos
    try {
        const response = await fetch('/partida/finalizar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                partida_id: PARTIDA_ID,
                ganador_id: ganador === 'empate' ? null : (ganador === 'X' ? JUGADOR1_ID : JUGADOR2_ID),
                puntos_jugador1: estadoJuego.puntosX,
                puntos_jugador2: estadoJuego.puntosO,
                estado: ganador === 'empate' ? 'empate' : 'finalizada'
            })
        });
        
        if (!response.ok) {
            console.error('Error al guardar la partida');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Reiniciar juego
document.getElementById('btn-reiniciar').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres reiniciar el juego? El progreso actual se perderá.')) {
        location.reload();
    }
});

// Nueva partida
document.getElementById('btn-nueva-partida').addEventListener('click', () => {
    window.location.href = '/';
});

// Ver ranking
document.getElementById('btn-ver-ranking').addEventListener('click', () => {
    window.location.href = '/ranking';
});

// Inicializar el juego al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarTablero();
    actualizarTurno();
    actualizarPuntos();
});
