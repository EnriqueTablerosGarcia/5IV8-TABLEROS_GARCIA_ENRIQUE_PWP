//lo va a consumir 
const express = require('express'); 
//acabamos jeje 


const mirrow = require ('./endpoints/mirrow');
//como un JS, como una libreria 

//vamos a hacer una instancia  del server

const app = express();
const port = 3000;

app.use(express.json());
//middleware para que el servidor entienda json, parsear el json

//definimos rutas
//cualquier tipo de ruta *
app.get('/', mirrow);
app.post('/', mirrow);
app.put('/', mirrow);
app.patch('/', mirrow);
app.delete('/', mirrow);
app.head('/', mirrow);


app.listen(port, () => {
    console.log(
        "Servidor escuchando");
});
