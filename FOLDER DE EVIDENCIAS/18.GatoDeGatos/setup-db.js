import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Karl!2008'
});

connection.query('CREATE DATABASE IF NOT EXISTS gato_de_gatos', (err) => {
    if (err) {
        console.error('Error al crear la base de datos:', err);
        connection.end();
        process.exit(1);
    }
    
    console.log('Base de datos gato_de_gatos creada o ya existe');
    
    connection.query('USE gato_de_gatos', (err) => {
        if (err) {
            console.error('Error al seleccionar la base de datos:', err);
            connection.end();
            process.exit(1);
        }
        
        // Crear tabla jugadores
        const createJugadores = `
        CREATE TABLE IF NOT EXISTS jugadores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL UNIQUE,
            partidas_jugadas INT DEFAULT 0,
            partidas_ganadas INT DEFAULT 0,
            partidas_perdidas INT DEFAULT 0,
            partidas_empatadas INT DEFAULT 0,
            puntuacion_total INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        
        connection.query(createJugadores, (err) => {
            if (err) {
                console.error('Error al crear tabla jugadores:', err);
                connection.end();
                process.exit(1);
            }
            
            console.log('Tabla jugadores creada');
            
            // Crear tabla partidas
            const createPartidas = `
            CREATE TABLE IF NOT EXISTS partidas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                jugador1_id INT NOT NULL,
                jugador2_id INT NOT NULL,
                ganador_id INT,
                puntos_jugador1 INT DEFAULT 0,
                puntos_jugador2 INT DEFAULT 0,
                estado ENUM('en_curso', 'finalizada', 'empate') DEFAULT 'en_curso',
                fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                fecha_fin TIMESTAMP NULL,
                FOREIGN KEY (jugador1_id) REFERENCES jugadores(id),
                FOREIGN KEY (jugador2_id) REFERENCES jugadores(id),
                FOREIGN KEY (ganador_id) REFERENCES jugadores(id)
            )`;
            
            connection.query(createPartidas, (err) => {
                if (err) {
                    console.error('Error al crear tabla partidas:', err);
                    connection.end();
                    process.exit(1);
                }
                
                console.log('Tabla partidas creada');
                console.log('¡Base de datos configurada correctamente!');
                connection.end();
            });
        });
    });
});
