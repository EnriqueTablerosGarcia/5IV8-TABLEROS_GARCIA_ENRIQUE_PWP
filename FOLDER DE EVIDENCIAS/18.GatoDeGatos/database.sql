-- Crear base de datos
CREATE DATABASE IF NOT EXISTS gato_de_gatos;
USE gato_de_gatos;

-- Tabla de jugadores
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

-- Tabla de partidas
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

-- Insertar jugadores de ejemplo
INSERT INTO jugadores (nombre, partidas_jugadas, partidas_ganadas, partidas_perdidas, partidas_empatadas, puntuacion_total) 
VALUES 
('Jugador1', 5, 3, 1, 1, 300),
('Jugador2', 5, 2, 2, 1, 200)
ON DUPLICATE KEY UPDATE nombre=nombre;
