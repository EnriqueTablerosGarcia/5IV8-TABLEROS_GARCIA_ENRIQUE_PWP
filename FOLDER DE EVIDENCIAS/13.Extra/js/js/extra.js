function memoize(fn) {
    // Map principal para el arreglo y guardar cache
    const cache = new Map();
        return function(...args) {
        // Nodo actual en el árbol de caché
        let currentNode = cache;
        
        // Nav usando cada argumento como clave
    
        for (let i = 0; i < args.length - 1; i++) {
            // Si no existe un Map para este argumento, lo creamos
            if (!currentNode.has(args[i])) {
                currentNode.set(args[i], new Map());
            }
        
            currentNode = currentNode.get(args[i]);
        }
        
        // El último argumento se usa para almacenar/recuperar el resultado
        const lastArg = args[args.length - 1];
        
        // Verificamos si ya tenemos el resultado cacheado 
        if (currentNode.has(lastArg)) {
            return currentNode.get(lastArg);
        }
        

        const result = fn(...args);
        // Guardamos el resultado en el caché
        currentNode.set(lastArg, result);
                return result;
    };
}
