const data = require("../server/data");

const isPrime = function (input) {
  // your code here:  this function accepts a positive integer 'input' and should return true if the integer is prime and false if it is not (for simplicity, do not consider 0 or 1 as prime)
  if (input < 2) return false;
  const squareRoot = Math.floor(Math.sqrt(input));
  for (let i = 2; i <= squareRoot; i++) {
    if (input % i === 0) {
      return false;
    }
  }
  return true;
};

const nameVowels = function () {
  // your code here:  using 'data', this function should return the number of animals who's name contains more than 3 vowels (for simplicity, do not consider "y" a vowel)
};

const addProperty = function () {
  // your code here:  using 'data', this function should return (without changing the order) a list of animals with a property named 'gender' added to each animal. the value of this new property should be 'F' if the id is prime (highest priority), 'M' if the id is odd, and 'N/A' if the id is even (lowest priority)
};

const palindromes = function (input) {
  // your code here:  this function accepts one string 'input' and should return true if the string is a palindrome and false if it is not
};

const anagrams = function (input1, input2) {
  // your code here:  this function accepts two strings 'input1', 'input2' and should return true if the strings are anagrams and false if they are not
};

const ageSum = function () {
  // your code here:  using 'data', this function should return the sum of all animals ages
};

module.exports = {
  isPrime,
  nameVowels,
  addProperty,
  palindromes,
  anagrams,
  ageSum,
};
