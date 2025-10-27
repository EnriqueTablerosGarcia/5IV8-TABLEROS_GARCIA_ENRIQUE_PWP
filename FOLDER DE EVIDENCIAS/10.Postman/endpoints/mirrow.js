const mirrow = (req, res) => {
    const methods = [{
        method: 'POST',
        hasBody: true,
        purpouse:'El metodo POST se utiliza para enviar una entidad a un recurso especifico, causando a menudo un cambio en el estado o efectos secundarios en el servidor.' 
    }, {
        method: 'PUT',
        hasBody: true,
        purpouse:'El metodo PUT remplaza todas las representaciones actuales del recurso de destino con la carga util de la solicitud.'
    }, {
        method: 'PATCH',
        hasBody: true,
        purpouse:'El metodo PATCH se utiliza para aplicar modificaciones parciales a un recurso.'
    }, {
        method: 'HEAD',
        hasBody: false,
        //CABECERA
        purpouse:'El metodo HEAD pide una respuesta identica a la de una peticion GET, pero sin el cuerpo de la respuesta'
    }, {
        method: 'GET',
        hasBody: false,
        purpouse:'El metodo GET solicita una representacion de un recurso especifico, las peticiones q usan el metodo get, solo deben recuperar datos  '

},{
method: 'DELETE',
hasBody: false,
purpouse:'El metodo DELETE elimina un recurso especifico'   
}];
//func flecha = retornar si, jeje, funciones callback, es una func q se puede llamar a si misma, recursividad / proceso para q una variable o funcion se llame a si mismo: Método burbuja o 8!
const requestMethod = methods.find(m => m.method === req.method) || (
//req peticion del metodo                                         o
    {
        method: req.method,
        hasBody: false,
        //como no se que es, x defecto es false 
        purpouse: 'No tiene body, no hay una respuesta, Método no soportado'
    }
);


requestMethod.purpouse+= requestMethod.hasBody ? 'Tiene cuerpo : ' : 'No tiene Cuerpo';
//operador ternario ?, if cortito

if (requestMethod.hasBody) {
    //es una parte del body html 
    req.body ;//JS debe de parsear mediante un JSON el objeto necesario
    res.json({
        ...req.body,ruta_consumida:req.route.path, ...requestMethod
    });

} else {
    res.json({
        ruta_consumida:req.route.path, ...req.originalUrl
    });
}
// ... tipo de funcion - gramatica suspensivo glomerando todo lo que venga 
    };

    module.exports = mirrow;