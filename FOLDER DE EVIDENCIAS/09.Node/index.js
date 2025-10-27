var http = require('http');
//vamos a crear nuestro propio server

var servidor = http.createServer(function (req, res) {
    //Req -  es una solicitud, que viene por parte de la arquitectura cliente servidor, todos los clientes (navegadores, usuarios, app , servicios, etc) son los que realizan una peticion por parte del protocolo 

    //Res - es la respuesta que el servidor le va a dar al cliente

    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.write ('<h1>Hola Mundo desde Node.js</h1>');
    res.write ('<h1>A mimir</h1>');
     res.write ('<h1>A mimir x2</h1>');
    console.log('Hola si entro al servidor');
    res.end();
}   );


//es necesario tener un puerto de comunicacion para el server
servidor.listen(3000);
console.log('Servidor ejecutandose en http://localhost:3000');