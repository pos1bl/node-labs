function deepClone(obj: object): object {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const clone: Array<unknown> | object = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          clone[key] = deepClone(obj[key]);
      }
  }

  return clone;
}

const obj = {
  name: 'John',
  age: 30,
  hobbies: ['reading', 'traveling'],
  address: {
      street: 'Main Street',
      city: 'New York',
  },
};
const clonedObj = deepClone(obj);

console.log(clonedObj);
console.log(clonedObj !== obj);
