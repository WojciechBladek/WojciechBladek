// interview task
// get parameters from string and map it.

const text =
  "customs.com/resource?firstParameter=test1&secondParameter=test2&thirdParameter=test3";

const textArray = text.split("?")[1].split("&");
const parameters = textArray.map((param) => {
  const keyValueArray = param.split("=");
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