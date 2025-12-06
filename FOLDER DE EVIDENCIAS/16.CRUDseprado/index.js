const express = require('express'); 
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

//primero las config d las rutas

const cursosRouter = require('../routers/cursosRouters.js');
const app = express();  
const db = requiere ('../database/db.js');

//config vistas

app.set('view engine', 'ejs');  
app.set('views', path.json(__dirname ,'/views'));
//config middleware

app.use(express.json());
app.use(cors());

//vamos a generar una vista  estatica
app.use(express.static(path.join(__dirname, 'views')));

//necesito ver mi pagina de cursos 
app.get('/vista/cursos-ejs', (req, res) => {
    //redireccionar para consumir
    res.redirect ('vista/cursos-ejs');
});

//ruta de bienvenida 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bienvenido.html'));
}); 
//vamos a renderizar la ruta d consulta

//renderizar la ruta de consulta
app.get('/vista/cursos-ejs', (req, res) => {
    const querry = ('SELECT * FROM cursos', ( error, resultados) => {
        if (error) {
            console.log('Error al obtener los cursos: ' + error.message);
            res.status(500).send('Error al obtener los cursos');
            return res.render('cursos', { cursos: [] });
        }
        return res.render('cursos', { cursos: resultados });
    });
});
// usar las rutas 
app.use('/cursos', cursosRouter);

//post
cursosRouter.post('/registrar-curso', cursosController.createCurso);   
//put
cursosRouter.put('/:id', cursosController.updateCurso);

//delete 
cursosRouter.delete('/:id', cursosController.deleteCurso);

