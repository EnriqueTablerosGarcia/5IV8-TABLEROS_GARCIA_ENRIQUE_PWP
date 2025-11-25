const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config({path: './.env'});

const app = express();
const port = 3000;

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

// FUNCIONES DE VALIDACIÓN

// Función para detectar emojis
function contieneEmojis(texto) {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}]/gu;
    return emojiRegex.test(texto);
}

// Función para validar caracteres permitidos (solo letras, números, espacios, guiones, puntos, °, paréntesis, /)
function esTextoValido(texto) {
    const textoRegex = /^[a-zA-Z0-9\s\-\.°ºª()\/%ÁÉÍÓÚáéíóúÑñ]+$/;
    return textoRegex.test(texto);
}

// Función para validar formato de fecha (YYYY-MM-DD)
function esFechaValida(fecha) {
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha)) return false;
    const date = new Date(fecha);
    return date instanceof Date && !isNaN(date);
}

// Función para validar que no contenga scripts maliciosos
function contieneScriptMalicioso(texto) {
    const scriptRegex = /<script|javascript:|onerror=|onclick=|onload=/gi;
    return scriptRegex.test(texto);
}

// Función para validar lectura (números con unidades)
function esLecturaValida(lectura) {
    const lecturaRegex = /^[0-9]+\.?[0-9]*\s*[a-zA-ZºªÁÉÍÓÚáéíóúÑñ°%\/\-]+$/;
    return lecturaRegex.test(lectura.trim());
}

// Función para validar certificado (alfanumérico con guiones)
function esCertificadoValido(certificado) {
    const certRegex = /^[A-Z0-9\-]+$/i;
    return certRegex.test(certificado.trim());
}

// RUTAS

// Ruta GET para mostrar el formulario y la lista de instrumentos
app.get('/', (req, res) => {
    const query = 'SELECT * FROM instrumentos ORDER BY fecha_calibracion_actual DESC';
    bd.query(query, (error, resultados) => {
        if (error) {
            console.log('Error al obtener los instrumentos: ' + error);
            res.render('index', { instrumentos: [], error: 'Error al obtener los instrumentos' });
        } else {
            res.render('index', { instrumentos: resultados, error: req.query.error || null });
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
    
    // VALIDACIONES
    const errores = [];
    
    // Validar que todos los campos estén presentes
    if (!id_instrumento || !ultima_calibracion || !fecha_calibracion_actual || 
        !estandar_referencia || !lectura_antes || !lectura_despues || 
        !certificado_asociado || !proxima_calibracion) {
        return res.redirect('/?error=' + encodeURIComponent('- Todos los campos son obligatorios'));
    }
    
    // Validar espacios al inicio o final
    if (id_instrumento !== id_instrumento.trim()) {
        errores.push('- ID Instrumento: No debe tener espacios al inicio o al final');
    }
    if (estandar_referencia !== estandar_referencia.trim()) {
        errores.push('- Estándar de Referencia: No debe tener espacios al inicio o al final');
    }
    if (lectura_antes !== lectura_antes.trim()) {
        errores.push('- Lectura Antes: No debe tener espacios al inicio o al final');
    }
    if (lectura_despues !== lectura_despues.trim()) {
        errores.push('- Lectura Después: No debe tener espacios al inicio o al final');
    }
    if (certificado_asociado !== certificado_asociado.trim()) {
        errores.push('- Certificado: No debe tener espacios al inicio o al final');
    }
    
    // Validar emojis en todos los campos de texto
    if (contieneEmojis(id_instrumento) || contieneEmojis(estandar_referencia) || 
        contieneEmojis(lectura_antes) || contieneEmojis(lectura_despues) || 
        contieneEmojis(certificado_asociado)) {
        errores.push('- No se permiten emojis en los campos');
    }
    
    // Validar scripts maliciosos
    if (contieneScriptMalicioso(id_instrumento) || contieneScriptMalicioso(estandar_referencia) || 
        contieneScriptMalicioso(lectura_antes) || contieneScriptMalicioso(lectura_despues) || 
        contieneScriptMalicioso(certificado_asociado)) {
        errores.push('Contenido malicioso detectado');
    }
    
    // Validar caracteres permitidos en campos de texto
    if (!esTextoValido(id_instrumento)) {
        errores.push('- ID Instrumento contiene caracteres no permitidos');
    }
    if (!esTextoValido(estandar_referencia)) {
        errores.push('- Estándar de Referencia contiene caracteres no permitidos');
    }
    
    // Validar formato de lecturas
    if (!esLecturaValida(lectura_antes)) {
        errores.push('- Lectura Antes debe tener formato: número + unidad (ej: 10.2°C)');
    }
    if (!esLecturaValida(lectura_despues)) {
        errores.push('- Lectura Después debe tener formato: número + unidad (ej: 10.0°C)');
    }
    
    // Validar certificado
    if (!esCertificadoValido(certificado_asociado)) {
        errores.push('- Certificado debe ser alfanumérico con guiones (ej: CERT-2024-001)');
    }
    
    // Validar fechas
    if (!esFechaValida(ultima_calibracion)) {
        errores.push('- Última Calibración no es una fecha válida');
    }
    if (!esFechaValida(fecha_calibracion_actual)) {
        errores.push('- Fecha Calibración Actual no es una fecha válida');
    }
    if (!esFechaValida(proxima_calibracion)) {
        errores.push('- Próxima Calibración no es una fecha válida');
    }
    
    // Validar longitud de campos
    if (id_instrumento.length > 100 || estandar_referencia.length > 100 || 
        lectura_antes.length > 50 || lectura_despues.length > 50 || 
        certificado_asociado.length > 100) {
        errores.push('- Uno o más campos exceden la longitud máxima permitida');
    }
    
    // Validar lógica de fechas
    const fechaUltima = new Date(ultima_calibracion);
    const fechaActual = new Date(fecha_calibracion_actual);
    const fechaProxima = new Date(proxima_calibracion);
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    const fecha20AnosAtras = new Date();
    fecha20AnosAtras.setFullYear(fechaHoy.getFullYear() - 20);
    const fecha10AnosAdelante = new Date();
    fecha10AnosAdelante.setFullYear(fechaHoy.getFullYear() + 10);
    
    // Validar que la última calibración no sea futura
    if (fechaUltima > fechaHoy) {
        errores.push('- La Última Calibración no puede ser una fecha futura');
    }
    
    // Validar que las fechas no sean muy antiguas o muy futuras
    if (fechaUltima < fecha20AnosAtras) {
        errores.push('- Última Calibración no puede ser mayor a 20 años en el pasado');
    }
    if (fechaActual < fecha20AnosAtras) {
        errores.push('- Fecha Calibración Actual no puede ser mayor a 20 años en el pasado');
    }
    if (fechaProxima > fecha10AnosAdelante) {
        errores.push('- Próxima Calibración no puede ser mayor a 10 años en el futuro');
    }
    
    // Validar secuencia lógica de fechas
    if (fechaActual < fechaUltima) {
        errores.push('- La Fecha de Calibración Actual no puede ser anterior a la Última Calibración');
    }
    if (fechaProxima <= fechaActual) {
        errores.push('- La Próxima Calibración debe ser posterior a la Calibración Actual');
    }
    if (fechaProxima <= fechaUltima) {
        errores.push('- La Próxima Calibración debe ser posterior a la Última Calibración');
    }
    
    // Si hay errores, retornarlos
    if (errores.length > 0) {
        return res.redirect('/?error=' + encodeURIComponent(errores.join(' | ')));
    }
    
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
            res.redirect('/?error=' + encodeURIComponent('- Error al crear el registro en la base de datos'));
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
            res.redirect('/?error=' + encodeURIComponent('- Error al eliminar el registro'));
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
            res.redirect('/?error=' + encodeURIComponent('- Error al obtener el instrumento'));
        } else if (!resultados || resultados.length === 0) {
            console.log('Instrumento no encontrado con ID: ' + instrumentoId);
            res.redirect('/?error=' + encodeURIComponent('- Instrumento no encontrado'));
        } else {
            res.render('edit', { instrumento: resultados[0], error: req.query.error || null });
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
    
    // VALIDACIONES
    const errores = [];
    
    // Validar que todos los campos estén presentes
    if (!id_instrumento || !ultima_calibracion || !fecha_calibracion_actual || 
        !estandar_referencia || !lectura_antes || !lectura_despues || 
        !certificado_asociado || !proxima_calibracion) {
        return res.redirect('/instrumentos/edit/' + instrumentoId + '?error=' + encodeURIComponent('- Todos los campos son obligatorios'));
    }
    
    // Validar espacios al inicio o final
    if (id_instrumento !== id_instrumento.trim()) {
        errores.push('- ID Instrumento: No debe tener espacios al inicio o al final');
    }
    if (estandar_referencia !== estandar_referencia.trim()) {
        errores.push('- Estándar de Referencia: No debe tener espacios al inicio o al final');
    }
    if (lectura_antes !== lectura_antes.trim()) {
        errores.push('- Lectura Antes: No debe tener espacios al inicio o al final');
    }
    if (lectura_despues !== lectura_despues.trim()) {
        errores.push('- Lectura Después: No debe tener espacios al inicio o al final');
    }
    if (certificado_asociado !== certificado_asociado.trim()) {
        errores.push('- Certificado: No debe tener espacios al inicio o al final');
    }
    
    // Validar emojis en todos los campos de texto
    if (contieneEmojis(id_instrumento) || contieneEmojis(estandar_referencia) || 
        contieneEmojis(lectura_antes) || contieneEmojis(lectura_despues) || 
        contieneEmojis(certificado_asociado)) {
        errores.push('- No se permiten emojis en los campos');
    }
    
    // Validar scripts maliciosos
    if (contieneScriptMalicioso(id_instrumento) || contieneScriptMalicioso(estandar_referencia) || 
        contieneScriptMalicioso(lectura_antes) || contieneScriptMalicioso(lectura_despues) || 
        contieneScriptMalicioso(certificado_asociado)) {
        errores.push('- Contenido malicioso detectado');
    }
    
    // Validar caracteres permitidos en campos de texto
    if (!esTextoValido(id_instrumento)) {
        errores.push('- ID Instrumento contiene caracteres no permitidos');
    }
    if (!esTextoValido(estandar_referencia)) {
        errores.push('- Estándar de Referencia contiene caracteres no permitidos');
    }
    
    // Validar formato de lecturas
    if (!esLecturaValida(lectura_antes)) {
        errores.push('- Lectura Antes debe tener formato: número + unidad (ej: 10.2°C)');
    }
    if (!esLecturaValida(lectura_despues)) {
        errores.push('- Lectura Después debe tener formato: número + unidad (ej: 10.0°C)');
    }
    
    // Validar certificado
    if (!esCertificadoValido(certificado_asociado)) {
        errores.push('- Certificado debe ser alfanumérico con guiones (ej: CERT-2024-001)');
    }
    
    // Validar fechas
    if (!esFechaValida(ultima_calibracion)) {
        errores.push('- Última Calibración no es una fecha válida');
    }
    if (!esFechaValida(fecha_calibracion_actual)) {
        errores.push('- Fecha Calibración Actual no es una fecha válida');
    }
    if (!esFechaValida(proxima_calibracion)) {
        errores.push('- Próxima Calibración no es una fecha válida');
    }
    
    // Validar longitud de campos
    if (id_instrumento.length > 100 || estandar_referencia.length > 100 || 
        lectura_antes.length > 50 || lectura_despues.length > 50 || 
        certificado_asociado.length > 100) {
        errores.push('-Uno o más campos exceden la longitud máxima permitida');
    }
    
    // Validar lógica de fechas
    const fechaUltima = new Date(ultima_calibracion);
    const fechaActual = new Date(fecha_calibracion_actual);
    const fechaProxima = new Date(proxima_calibracion);
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0);
    const fecha20AnosAtras = new Date();
    fecha20AnosAtras.setFullYear(fechaHoy.getFullYear() - 20);
    const fecha10AnosAdelante = new Date();
    fecha10AnosAdelante.setFullYear(fechaHoy.getFullYear() + 10);
    
    // Validar que la última calibración no sea futura
    if (fechaUltima > fechaHoy) {
        errores.push('- La Última Calibración no puede ser una fecha futura');
    }
    
    // Validar que las fechas no sean muy antiguas o muy futuras
    if (fechaUltima < fecha20AnosAtras) {
        errores.push('- Última Calibración no puede ser mayor a 20 años en el pasado');
    }
    if (fechaActual < fecha20AnosAtras) {
        errores.push('- Fecha Calibración Actual no puede ser mayor a 20 años en el pasado');
    }
    if (fechaProxima > fecha10AnosAdelante) {
        errores.push('- Próxima Calibración no puede ser mayor a 10 años en el futuro');
    }
    
    // Validar secuencia lógica de fechas
    if (fechaActual < fechaUltima) {
        errores.push('- La Fecha de Calibración Actual no puede ser anterior a la Última Calibración');
    }
    if (fechaProxima <= fechaActual) {
        errores.push('- La Próxima Calibración debe ser posterior a la Calibración Actual');
    }
    if (fechaProxima <= fechaUltima) {
        errores.push('- La Próxima Calibración debe ser posterior a la Última Calibración');
    }
    
    // Si hay errores, retornarlos
    if (errores.length > 0) {
        return res.redirect('/instrumentos/edit/' + instrumentoId + '?error=' + encodeURIComponent(errores.join(' | ')));
    }
    
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
            console.log('- Error al actualizar el registro: ' + error);
            res.redirect('/instrumentos/edit/' + instrumentoId + '?error=' + encodeURIComponent('-  Error al actualizar el registro en la base de datos'));
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
