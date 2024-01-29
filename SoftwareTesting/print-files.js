// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const { readFileSync } = fs;

const readTestCase = readFileSync('./SoftwareTesting/README-test-case.md', {
  encoding: 'utf8',
});
const readBugReport = readFileSync('./SoftwareTesting/README-bug-report.md', {
  encoding: 'utf8',
});
console.log(readTestCase);
console.log(readBugReport);
