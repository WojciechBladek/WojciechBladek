const fs = require('fs');
const { readFileSync } = fs;

const readTestCase = readFileSync('./README-test-case.md', {
  encoding: 'utf8',
});
const readBugReport = readFileSync('./README-bug-report.md', {
  encoding: 'utf8',
});
console.log(readTestCase);
console.log(readBugReport);
