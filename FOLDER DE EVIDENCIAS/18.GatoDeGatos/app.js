import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = 8000;

// Configuración de MySQL
const bd = mysql.createPool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

bd.getConnection((error, connection) => {
    if (error) {
        console.log('Error de conexión a la base de datos: ' + error);
    } else {
        console.log('Conexión exitosa a la base de datos');
        connection.release();
    }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS

// Página principal - Inicio de partida
app.get('/', (req, res) => {
    const query = 'SELECT * FROM jugadores ORDER BY puntuacion_total DESC';
    bd.query(query, (error, jugadores) => {
        if (error) {
            console.log('Error al obtener jugadores: ' + error);
            res.render('index', { jugadores: [], error: 'Error al obtener jugadores' });
        } else {
            res.render('index', { jugadores: jugadores, error: req.query.error || null });
        }
    });
});

// Crear o buscar jugador
app.post('/jugador', (req, res) => {
    const { nombre } = req.body;
    
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    
    const nombreLimpio = nombre.trim();
    
    // Buscar si existe
    const queryBuscar = 'SELECT * FROM jugadores WHERE nombre = ?';
    bd.query(queryBuscar, [nombreLimpio], (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: 'Error al buscar jugador' });
        }
        
        if (resultados.length > 0) {
            // Jugador existe
            return res.json(resultados[0]);
        }
        
        // Crear nuevo jugador
        const queryCrear = 'INSERT INTO jugadores (nombre) VALUES (?)';
        bd.query(queryCrear, [nombreLimpio], (error, resultado) => {
            if (error) {
                return res.status(500).json({ error: 'Error al crear jugador' });
            }
            
            const queryObtener = 'SELECT * FROM jugadores WHERE id = ?';
            bd.query(queryObtener, [resultado.insertId], (error, jugador) => {
                if (error) {
                    return res.status(500).json({ error: 'Error al obtener jugador' });
                }
                res.json(jugador[0]);
            });
        });
    });
});

// Iniciar partida
app.post('/partida/iniciar', (req, res) => {
    const { jugador1_id, jugador2_id } = req.body;
    
    if (!jugador1_id || !jugador2_id) {
        return res.status(400).json({ error: 'Se requieren ambos jugadores' });
    }
    
    if (jugador1_id === jugador2_id) {
        return res.status(400).json({ error: 'Los jugadores deben ser diferentes' });
    }
    
    const query = 'INSERT INTO partidas (jugador1_id, jugador2_id, estado) VALUES (?, ?, "en_curso")';
    bd.query(query, [jugador1_id, jugador2_id], (error, resultado) => {
        if (error) {
            console.log('Error al crear partida: ' + error);
            return res.status(500).json({ error: 'Error al crear partida' });
        }
        
        res.json({ partida_id: resultado.insertId });
    });
});

// Vista del juego
app.get('/juego/:partida_id', (req, res) => {
    const partidaId = req.params.partida_id;
    
    const query = `
        SELECT p.*, 
               j1.nombre as jugador1_nombre, 
               j2.nombre as jugador2_nombre
        FROM partidas p
        JOIN jugadores j1 ON p.jugador1_id = j1.id
        JOIN jugadores j2 ON p.jugador2_id = j2.id
        WHERE p.id = ?
    `;
    
    bd.query(query, [partidaId], (error, resultados) => {
        if (error || resultados.length === 0) {
            return res.redirect('/?error=' + encodeURIComponent('Partida no encontrada'));
        }
        
        res.render('juego', { partida: resultados[0] });
    });
});

// Finalizar partida
app.post('/partida/finalizar', (req, res) => {
    const { partida_id, ganador_id, puntos_jugador1, puntos_jugador2, estado } = req.body;
    
    // Obtener información de la partida
    const queryPartida = 'SELECT * FROM partidas WHERE id = ?';
    bd.query(queryPartida, [partida_id], (error, partidas) => {
        if (error || partidas.length === 0) {
            return res.status(500).json({ error: 'Error al obtener partida' });
        }
        
        const partida = partidas[0];
        
        // Actualizar partida
        const queryUpdate = `
            UPDATE partidas 
            SET ganador_id = ?, puntos_jugador1 = ?, puntos_jugador2 = ?, 
                estado = ?, fecha_fin = NOW() 
            WHERE id = ?
        `;
        
        bd.query(queryUpdate, [ganador_id, puntos_jugador1, puntos_jugador2, estado, partida_id], (error) => {
            if (error) {
                return res.status(500).json({ error: 'Error al actualizar partida' });
            }
            
            // Actualizar estadísticas de jugadores
            const updateJ1 = `
                UPDATE jugadores 
                SET partidas_jugadas = partidas_jugadas + 1,
                    ${ganador_id === partida.jugador1_id ? 'partidas_ganadas = partidas_ganadas + 1,' : ''}
                    ${ganador_id === partida.jugador2_id ? 'partidas_perdidas = partidas_perdidas + 1,' : ''}
                    ${!ganador_id ? 'partidas_empatadas = partidas_empatadas + 1,' : ''}
                    puntuacion_total = puntuacion_total + ?
                WHERE id = ?
            `;
            
            const updateJ2 = `
                UPDATE jugadores 
                SET partidas_jugadas = partidas_jugadas + 1,
                    ${ganador_id === partida.jugador2_id ? 'partidas_ganadas = partidas_ganadas + 1,' : ''}
                    ${ganador_id === partida.jugador1_id ? 'partidas_perdidas = partidas_perdidas + 1,' : ''}
                    ${!ganador_id ? 'partidas_empatadas = partidas_empatadas + 1,' : ''}
                    puntuacion_total = puntuacion_total + ?
                WHERE id = ?
            `;
            
            bd.query(updateJ1, [puntos_jugador1, partida.jugador1_id], () => {});
            bd.query(updateJ2, [puntos_jugador2, partida.jugador2_id], () => {});
            
            res.json({ success: true });
        });
    });
});

// Ranking
app.get('/ranking', (req, res) => {
    const query = 'SELECT * FROM jugadores ORDER BY puntuacion_total DESC LIMIT 20';
    bd.query(query, (error, jugadores) => {
        if (error) {
            console.log('Error al obtener ranking: ' + error);
            res.render('ranking', { ranking: [] });
        } else {
            res.render('ranking', { ranking: jugadores });
        }
    });
});

// CRUD Partidas - Listar todas las partidas
app.get('/partidas', (req, res) => {
    const query = `
        SELECT p.*, 
               j1.nombre as jugador1_nombre, 
               j2.nombre as jugador2_nombre,
               jg.nombre as ganador_nombre
        FROM partidas p
        INNER JOIN jugadores j1 ON p.jugador1_id = j1.id
        INNER JOIN jugadores j2 ON p.jugador2_id = j2.id
        LEFT JOIN jugadores jg ON p.ganador_id = jg.id
        ORDER BY p.fecha_inicio DESC
    `;
    
    bd.query(query, (error, partidas) => {
        if (error) {
            console.log('Error al obtener partidas: ' + error);
            res.render('partidas', { partidas: [] });
        } else {
            res.render('partidas', { partidas: partidas });
        }
    });
});

// CRUD Partidas - Eliminar partida
app.delete('/partida/:id', (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM partidas WHERE id = ?';
    bd.query(query, [id], (error, resultado) => {
        if (error) {
            console.log('Error al eliminar partida: ' + error);
            return res.status(500).json({ error: 'Error al eliminar partida' });
        }
        
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
