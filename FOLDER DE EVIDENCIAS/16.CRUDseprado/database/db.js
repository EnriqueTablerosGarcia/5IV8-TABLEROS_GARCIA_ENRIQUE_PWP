const mysql2 = require('mysql2');
const db = mysql2.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: 'Karl!2008',
    database: 'cursosdb'
}); 

db.connect((error) => {
    if (error) {
        console.log('El error de conexion es: ' + error.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});
module.exports = db;