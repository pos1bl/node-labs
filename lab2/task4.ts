const wrapper = (func: (...args: unknown[]) => unknown) => {
  const cache = new Map<string, unknown>();

  return (...args: unknown[]): unknown => {
    const key = args.toString();
    if (cache.has(key)) {
      console.log(`Result from cache: ${cache.get(key)}`);
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    console.log(`Result calculated: ${result}`);
    return result;
  };
};

const calc = (a: number, b: number, c: number): number => a + b + c;

const cachedCalc = wrapper(calc);

cachedCalc(2, 2, 3); // Result calculated: 7, повертає 7
cachedCalc(5, 8, 1); // Result calculated: 14, повертає 14
cachedCalc(2, 2, 3); // Result from cache: 7, повертає 7