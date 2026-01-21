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

// FUNCIONES DE VALIDACIÓN

// Función para detectar emojis
function contieneEmojis(texto) {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}]/gu;
    return emojiRegex.test(texto);
}

// Función para validar caracteres permitidos en nombres (solo letras, números, espacios, guiones, puntos)
function esNombreValido(texto) {
    const nombreRegex = /^[a-zA-Z0-9\s\-\.ÁÉÍÓÚáéíóúÑñ]+$/;
    return nombreRegex.test(texto);
}

// Función para validar que no contenga scripts maliciosos
function contieneScriptMalicioso(texto) {
    const scriptRegex = /<script|javascript:|onerror=|onclick=|onload=|<iframe|eval\(|alert\(/gi;
    return scriptRegex.test(texto);
}

// Función para validar que el texto no tenga espacios múltiples consecutivos
function tieneEspaciosMultiples(texto) {
    return /\s{2,}/.test(texto);
}

// Función para validar longitud mínima y máxima
function validarLongitud(texto, min, max) {
    const longitud = texto.trim().length;
    return longitud >= min && longitud <= max;
}

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
    
    // VALIDACIONES
    const errores = [];
    
    // Validar que el nombre esté presente
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
    
    const nombreLimpio = nombre.trim();
    
    // Validar espacios al inicio o final
    if (nombre !== nombreLimpio) {
        errores.push('El nombre no debe tener espacios al inicio o al final');
    }
    
    // Validar emojis
    if (contieneEmojis(nombreLimpio)) {
        errores.push('No se permiten emojis en el nombre');
    }
    
    // Validar scripts maliciosos
    if (contieneScriptMalicioso(nombreLimpio)) {
        errores.push('Contenido malicioso detectado en el nombre');
    }
    
    // Validar caracteres permitidos
    if (!esNombreValido(nombreLimpio)) {
        errores.push('El nombre contiene caracteres no permitidos (solo letras, números, espacios, guiones y puntos)');
    }
    
    // Validar espacios múltiples
    if (tieneEspaciosMultiples(nombreLimpio)) {
        errores.push('El nombre no debe tener espacios múltiples consecutivos');
    }
    
    // Validar longitud (mínimo 2, máximo 50 caracteres)
    if (!validarLongitud(nombreLimpio, 2, 50)) {
        errores.push('El nombre debe tener entre 2 y 50 caracteres');
    }
    
    // Validar que no sea solo números
    if (/^\d+$/.test(nombreLimpio)) {
        errores.push('El nombre no puede ser solo números');
    }
    
    // Validar que no comience con un número
    if (/^\d/.test(nombreLimpio)) {
        errores.push('El nombre no puede comenzar con un número');
    }
    
    // Si hay errores, retornarlos
    if (errores.length > 0) {
        return res.status(400).json({ error: errores.join(' | ') });
    }
    
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
    
    // VALIDACIONES
    const errores = [];
    
    // Validar que ambos jugadores estén presentes
    if (!jugador1_id || !jugador2_id) {
        return res.status(400).json({ error: 'Se requieren ambos jugadores' });
    }
    
    // Validar que sean números válidos
    if (isNaN(jugador1_id) || isNaN(jugador2_id)) {
        return res.status(400).json({ error: 'Los IDs de jugadores deben ser números válidos' });
    }
    
    // Convertir a números
    const id1 = parseInt(jugador1_id);
    const id2 = parseInt(jugador2_id);
    
    // Validar que sean números positivos
    if (id1 <= 0 || id2 <= 0) {
        return res.status(400).json({ error: 'Los IDs de jugadores deben ser números positivos' });
    }
    
    // Validar que los jugadores sean diferentes
    if (id1 === id2) {
        return res.status(400).json({ error: 'Los jugadores deben ser diferentes' });
    }
    
    // Verificar que ambos jugadores existan en la base de datos
    const queryVerificar = 'SELECT id FROM jugadores WHERE id IN (?, ?)';
    bd.query(queryVerificar, [id1, id2], (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: 'Error al verificar jugadores' });
        }
        
        if (resultados.length !== 2) {
            return res.status(400).json({ error: 'Uno o ambos jugadores no existen' });
        }
        
        // Crear la partida
        const query = 'INSERT INTO partidas (jugador1_id, jugador2_id, estado) VALUES (?, ?, "en_curso")';
        bd.query(query, [id1, id2], (error, resultado) => {
            if (error) {
                console.log('Error al crear partida: ' + error);
                return res.status(500).json({ error: 'Error al crear partida' });
            }
            
            res.json({ partida_id: resultado.insertId });
        });
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
    
    // VALIDACIONES
    const errores = [];
    
    // Validar que partida_id esté presente
    if (!partida_id) {
        return res.status(400).json({ error: 'El ID de la partida es obligatorio' });
    }
    
    // Validar que partida_id sea un número válido
    if (isNaN(partida_id) || parseInt(partida_id) <= 0) {
        return res.status(400).json({ error: 'El ID de la partida debe ser un número positivo válido' });
    }
    
    // Validar puntos
    if (puntos_jugador1 === undefined || puntos_jugador2 === undefined) {
        return res.status(400).json({ error: 'Los puntos de ambos jugadores son obligatorios' });
    }
    
    // Validar que los puntos sean números válidos
    if (isNaN(puntos_jugador1) || isNaN(puntos_jugador2)) {
        return res.status(400).json({ error: 'Los puntos deben ser números válidos' });
    }
    
    const puntosJ1 = parseInt(puntos_jugador1);
    const puntosJ2 = parseInt(puntos_jugador2);
    
    // Validar que los puntos no sean negativos
    if (puntosJ1 < 0 || puntosJ2 < 0) {
        return res.status(400).json({ error: 'Los puntos no pueden ser negativos' });
    }
    
    // Validar que los puntos estén en un rango razonable (0-100 por ejemplo)
    if (puntosJ1 > 100 || puntosJ2 > 100) {
        return res.status(400).json({ error: 'Los puntos no pueden ser mayores a 100' });
    }
    
    // Validar estado
    const estadosValidos = ['finalizada', 'empate', 'abandonada'];
    if (!estado || !estadosValidos.includes(estado)) {
        return res.status(400).json({ error: 'El estado debe ser: finalizada, empate o abandonada' });
    }
    
    // Validar ganador_id (puede ser null en caso de empate)
    if (ganador_id !== null && ganador_id !== undefined) {
        if (isNaN(ganador_id) || parseInt(ganador_id) <= 0) {
            return res.status(400).json({ error: 'El ID del ganador debe ser un número positivo válido' });
        }
    }
    
    // Obtener información de la partida
    const queryPartida = 'SELECT * FROM partidas WHERE id = ?';
    bd.query(queryPartida, [partida_id], (error, partidas) => {
        if (error || partidas.length === 0) {
            return res.status(500).json({ error: 'Error al obtener partida o partida no encontrada' });
        }
        
        const partida = partidas[0];
        
        // Validar que el ganador sea uno de los jugadores de la partida (si hay ganador)
        if (ganador_id !== null && ganador_id !== undefined) {
            const ganadorIdInt = parseInt(ganador_id);
            if (ganadorIdInt !== partida.jugador1_id && ganadorIdInt !== partida.jugador2_id) {
                return res.status(400).json({ error: 'El ganador debe ser uno de los jugadores de la partida' });
            }
        }
        
        // Validar que la partida no esté ya finalizada
        if (partida.estado !== 'en_curso') {
            return res.status(400).json({ error: 'La partida ya ha sido finalizada' });
        }
        
        // Actualizar partida
        const queryUpdate = `
            UPDATE partidas 
            SET ganador_id = ?, puntos_jugador1 = ?, puntos_jugador2 = ?, 
                estado = ?, fecha_fin = NOW() 
            WHERE id = ?
        `;
        
        bd.query(queryUpdate, [ganador_id, puntosJ1, puntosJ2, estado, partida_id], (error) => {
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
            
            bd.query(updateJ1, [puntosJ1, partida.jugador1_id], () => {});
            bd.query(updateJ2, [puntosJ2, partida.jugador2_id], () => {});
            
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
    
    // VALIDACIONES
    // Validar que el ID sea un número válido
    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({ error: 'El ID de la partida debe ser un número positivo válido' });
    }
    
    const partidaId = parseInt(id);
    
    // Verificar que la partida exista antes de eliminarla
    const queryVerificar = 'SELECT id FROM partidas WHERE id = ?';
    bd.query(queryVerificar, [partidaId], (error, resultados) => {
        if (error) {
            console.log('Error al verificar partida: ' + error);
            return res.status(500).json({ error: 'Error al verificar partida' });
        }
        
        if (resultados.length === 0) {
            return res.status(404).json({ error: 'Partida no encontrada' });
        }
        
        // Eliminar la partida
        const query = 'DELETE FROM partidas WHERE id = ?';
        bd.query(query, [partidaId], (error, resultado) => {
            if (error) {
                console.log('Error al eliminar partida: ' + error);
                return res.status(500).json({ error: 'Error al eliminar partida' });
            }
            
            res.json({ success: true, message: 'Partida eliminada correctamente' });
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
