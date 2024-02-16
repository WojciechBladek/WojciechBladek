// interview task
// get parameters from string and map it.

const text =
  'customs.com/resource?firstParameter=test1&secondParameter=test2&thirdParameter=test3';

const textArray = text.split('?')[1].split('&');
const parameters = textArray.map((param) => {
  const keyValueArray = param.split('=');
  const key = keyValueArray[0];
  const value = keyValueArray[1];
  return { [key]: value };
});

console.log(parameters);
//output:
// [
//   { firstParameter: 'test1' },
//   { secondParameter: 'test2' },
//   { thirdParameter: 'test3' }
// ]

// Method 2
// same output but shorter code.
const parameters2 = textArray.map((param) => {
  const [key, value] = param.split('=');
  return { [key]: value };
});

console.log(parameters2);

// Method 3
const parameters3 = textArray.map((param) => {
  const obj = {};
  const [key, value] = param.split('=');
  obj[key] = value;
  return obj;
});
console.log(parameters3);
