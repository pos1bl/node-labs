const wrapper = (func) => {
    const cache = new Map();

    return (...args) => {
        const key = args.toString();
        if (cache.has(key)) {
            console.log(`Result from cache: ${cache.get(key)}`);
            return cache.get(key);
        }

        const result = func(...args);
        cache.set(key, result);
        console.log(`Result calculated: ${result}`);
        return result;
    }
}

const calc = (a, b, c) => a + b + c;

const cachedCalc = wrapper(calc);

cachedCalc(2, 2, 3); // Result calculated: 7, повертає 7
cachedCalc(5, 8, 1); // Result calculated: 14, повертає 14
cachedCalc(2, 2, 3); // Result from cache: 7, повертає 7
