const isAnagram = (str1: string, str2: string): boolean => {
  return str1.toLowerCase().trim().split('').reverse().join('') === str2.toLowerCase().trim();
}

console.log(isAnagram('Vlad', 'lvad'));
console.log(isAnagram('MaDaM', 'madAM'));
console.log(isAnagram('whatsup', 'what'));
console.log(isAnagram('hi', 'in'));