function memoize(fn) {
    const cache = new Map();
    
    function explore(args) {
        let node = cache;
        for (const arg of args) {
            if (!node.has(arg)) {
                node.set(arg, new Map());
            }
            node = node.get(arg);
        }
        
        if (node.has('value')) {
            return node.get('value');
        } else {
            const value = fn(...args);
            node.set('value', value);
            return value;
        }
    }

    return function memoized(...args) {
        return explore(args);
    }
}