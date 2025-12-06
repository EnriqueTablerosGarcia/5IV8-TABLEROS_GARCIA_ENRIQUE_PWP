import mysql from 'mysql2/promise';

async function limpiar() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Karl!2008',
        database: 'gato_de_gatos'
    });
    
    try {
        const [result] = await connection.execute(
            "DELETE FROM jugadores WHERE nombre IN (?, ?, ?, ?, ?, ?, ?)",
            ['Pepe', 'Mariano', 'A', 'Hola', 'Jeje', 'Kikin', 'Michikun']
        );
        console.log('Jugadores eliminados:', result.affectedRows);
        
        const [jugadores] = await connection.execute('SELECT nombre, puntuacion_total FROM jugadores ORDER BY puntuacion_total DESC');
        console.log('\nJugadores restantes:');
        jugadores.forEach(j => console.log(`${j.nombre}: ${j.puntuacion_total} puntos`));
    } finally {
        await connection.end();
    }
}

limpiar();
