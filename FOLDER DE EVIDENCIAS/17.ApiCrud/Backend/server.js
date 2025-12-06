//se usa la estructura js 8
import express from 'express';
import path from 'path';
import productRoutes from './routes/productroutes.js';
//aqui nosotros tenemos que agregar las rutas que se van a consumir

//levantar el servicio
const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve(); //obtener el directorio se tiene q configurar para conectar back con front

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend', 'public')));

app.set('views engine', 'ejs');
app.set('public', path.join(__dirname, '../Frontend', 'public'));

//vamos a consumir las rutas
app.use('/', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});