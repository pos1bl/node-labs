function deepClone(obj) {
    // перевірка типу вхідного параметру
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    let clone;
    // створюємо новий об'єкт або масив в залежності від типу вхідного об'єкту
    if (Array.isArray(obj)) {
        clone = [];
    } else {
        clone = {};
    }

    // проходимося по всіх властивостях вхідного об'єкту
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // рекурсивно клонуємо вкладений об'єкт або масив
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

console.log(clonedObj)
