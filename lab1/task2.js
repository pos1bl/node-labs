function isAnagram(str1, str2) {
    const string1 = str1.toLowerCase();
    const string2 = str2.toLowerCase();

    if (string1.length !== string2.length) {
       return false;
    }

    for(let i = 0; i < string1.length; i++) {
        if (string1[i] !== string2[string2.length - 1 - i]) return false;
    }

    return true;
}

console.log(isAnagram('Vlad', 'dalv'));
console.log(isAnagram('MaDaM', 'madAM'));
console.log(isAnagram('whatsup', 'what'));
console.log(isAnagram('hi', 'in'));
