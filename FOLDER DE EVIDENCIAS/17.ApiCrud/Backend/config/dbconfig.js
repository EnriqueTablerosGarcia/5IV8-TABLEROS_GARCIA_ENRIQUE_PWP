import mysql from 'mysql2';     
import dotenv from 'dotenv';
//si vamos a tener una base d datos en servidor
//import {filURLToPath} from 'url';
//const __filename = filURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//dotenv.config();((path:path.resolve()+'../.env'))

dotenv.config();
const config = mysql.createPool({         
    host: "localhost",     
    user: "root",
    password: "Karl!2008",
    database: "curso",
    //conecctionlimit: 10,
    //acquireTimeout: 30000,
    //idleTimeout: 30000,

}); 


config.getConnection((err) => {
    if (err) {
        console.error('Error de conexion a la base de datos:', err);    
     return;
    } 
        console.log('Conexion exitosa a la base de datos');    
        connection.release(); 
    
}); 

export default config; 