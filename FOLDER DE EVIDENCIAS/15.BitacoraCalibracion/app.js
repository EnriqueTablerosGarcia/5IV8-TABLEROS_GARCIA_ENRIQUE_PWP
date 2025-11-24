const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config({path: './.env'});

const app = express();
const port = 3001;

// Configuración de MySQL
const bd = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

bd.connect((error) => {
    if (error) {
        console.log('Error de conexión a la base de datos: ' + error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Archivos estáticos
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/IMG'));

// RUTAS

// Ruta GET para mostrar el formulario y la lista de instrumentos
app.get('/', (req, res) => {
    const query = 'SELECT * FROM instrumentos ORDER BY fecha_calibracion_actual DESC';
    bd.query(query, (error, resultados) => {
        if (error) {
            console.log('Error al obtener los instrumentos: ' + error);
            res.status(500).send('Error al obtener los instrumentos');
        } else {
            res.render('index', { instrumentos: resultados });
        }
    });
});

// Ruta POST para crear un nuevo registro
app.post('/instrumentos', (req, res) => {
    const { 
        id_instrumento, 
        ultima_calibracion, 
        fecha_calibracion_actual, 
        estandar_referencia, 
        lectura_antes, 
        lectura_despues, 
        certificado_asociado, 
        proxima_calibracion 
    } = req.body;
    
    const query = `INSERT INTO instrumentos (
        id_instrumento, 
        ultima_calibracion, 
        fecha_calibracion_actual, 
        estandar_referencia, 
        lectura_antes, 
        lectura_despues, 
        certificado_asociado, 
        proxima_calibracion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    bd.query(query, [
        id_instrumento, 
        ultima_calibracion, 
        fecha_calibracion_actual, 
        estandar_referencia, 
        lectura_antes, 
        lectura_despues, 
        certificado_asociado, 
        proxima_calibracion
    ], (error, resultados) => {
        if (error) {
            console.log('Error al crear el registro: ' + error);
            res.status(500).send('Error al crear el registro');
        } else {
            res.redirect('/');
        }
    });
});

// Ruta GET para eliminar un registro
app.get('/instrumentos/delete/:id', (req, res) => {
    const instrumentoId = req.params.id;
    const query = 'DELETE FROM instrumentos WHERE id = ?';
    
    bd.query(query, [instrumentoId], (error, resultados) => {
        if (error) {
            console.log('Error al eliminar el registro: ' + error);
            res.status(500).send('Error al eliminar el registro');
        } else {
            res.redirect('/');
        }
    });
});

// Ruta GET para mostrar el formulario de edición
app.get('/instrumentos/edit/:id', (req, res) => {
    const instrumentoId = req.params.id;
    const query = 'SELECT * FROM instrumentos WHERE id = ?';
    
    bd.query(query, [instrumentoId], (error, resultados) => {
        if (error) {
            console.log('Error al obtener el instrumento: ' + error);
            res.status(500).send('Error al obtener el instrumento');
        } else {
            res.render('edit', { instrumento: resultados[0] });
        }
    });
});

// Ruta POST para actualizar un registro
app.post('/instrumentos/update/:id', (req, res) => {
    const instrumentoId = req.params.id;
    const { 
        id_instrumento, 
        ultima_calibracion, 
        fecha_calibracion_actual, 
        estandar_referencia, 
        lectura_antes, 
        lectura_despues, 
        certificado_asociado, 
        proxima_calibracion 
    } = req.body;
    
    const query = `UPDATE instrumentos SET 
        id_instrumento = ?, 
        ultima_calibracion = ?, 
        fecha_calibracion_actual = ?, 
        estandar_referencia = ?, 
        lectura_antes = ?, 
        lectura_despues = ?, 
        certificado_asociado = ?, 
        proxima_calibracion = ? 
        WHERE id = ?`;
    
    bd.query(query, [
        id_instrumento, 
        ultima_calibracion, 
        fecha_calibracion_actual, 
        estandar_referencia, 
        lectura_antes, 
        lectura_despues, 
        certificado_asociado, 
        proxima_calibracion,
        instrumentoId
    ], (error, resultados) => {
        if (error) {
            console.log('Error al actualizar el registro: ' + error);
            res.status(500).send('Error al actualizar el registro');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
