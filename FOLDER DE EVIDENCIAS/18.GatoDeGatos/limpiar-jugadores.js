import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Karl!2008',
    database: 'gato_de_gatos'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
        process.exit(1);
    }
    
    console.log('Conectado a la base de datos');
    
    // Eliminar jugadores de prueba
    const deleteQuery = `DELETE FROM jugadores WHERE nombre IN ('Pepe', 'Mariano', 'A', 'Hola', 'Jeje', 'Kikin', 'Michikun')`;
    
    connection.query(deleteQuery, (err, result) => {
        if (err) {
            console.error('Error al eliminar:', err);
            connection.end();
            process.exit(1);
        }
        
        console.log(`Jugadores eliminados: ${result.affectedRows}`);
        
        // Mostrar jugadores restantes
        connection.query('SELECT * FROM jugadores', (err, jugadores) => {
            if (err) {
                console.error('Error:', err);
            } else {
                console.log('\nJugadores restantes:');
                console.log(jugadores);
            }
            connection.end();
        });
    });
});
