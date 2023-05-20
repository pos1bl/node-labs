type Calculator = (num?: number) => number | Calculator;
type AddFunction = (initialValue: number) => Function;

const add: AddFunction = (initialValue) => {
    let sum = initialValue;

    const calculate: Calculator = (nextNum) => {
        if (nextNum === undefined) {
            return sum;
        }
        sum += nextNum;

        return calculate;
    };

    return calculate;
};

console.log(add(1)(2)(3)(4)());