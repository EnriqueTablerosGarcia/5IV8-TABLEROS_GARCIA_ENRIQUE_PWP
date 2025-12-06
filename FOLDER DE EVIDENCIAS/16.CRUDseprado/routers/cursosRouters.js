//este es el middleware
const { Router} = require('express');

//denfir la ruta del consumo del endpoint

const cursosController = require('./Controllers/cursosControl.js');

const cursosRouter= Router();
//definir los endpoint

cursosRouter.get('/', cursosController.getCursos); 
//necesito busqueda por id 
cursosRouter.get('/:id', cursosController.getCursoById);