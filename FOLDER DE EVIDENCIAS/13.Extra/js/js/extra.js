function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        let currentNode = cache;
        
        for (let i = 0; i < args.length - 1; i++) {
            if (!currentNode.has(args[i])) {
                currentNode.set(args[i], new Map());
            }
            currentNode = currentNode.get(args[i]);
        }
        
        const lastArg = args[args.length - 1];
        
        if (currentNode.has(lastArg)) {
            return currentNode.get(lastArg);
        }
        
        const result = fn(...args);
        currentNode.set(lastArg, result);
        
        return result;
    };
}
