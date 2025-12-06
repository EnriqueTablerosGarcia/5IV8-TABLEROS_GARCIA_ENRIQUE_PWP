
CREATE DATABASE IF NOT EXISTS gato_de_gatos;
USE gato_de_gatos;


CREATE TABLE IF NOT EXISTS jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    partidas_jugadas INT DEFAULT 0,
    partidas_ganadas INT DEFAULT 0,
    partidas_perdidas INT DEFAULT 0,
    partidas_empatadas INT DEFAULT 0,
    puntuacion_total INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS partidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jugador1_id INT NOT NULL,
    jugador2_id INT NOT NULL,
    ganador_id INT,
    puntos_jugador1 INT DEFAULT 0,
    puntos_jugador2 INT DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'en_progreso',
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_fin TIMESTAMP NULL,
    FOREIGN KEY (jugador1_id) REFERENCES jugadores(id),
    FOREIGN KEY (jugador2_id) REFERENCES jugadores(id),
    FOREIGN KEY (ganador_id) REFERENCES jugadores(id)
);
