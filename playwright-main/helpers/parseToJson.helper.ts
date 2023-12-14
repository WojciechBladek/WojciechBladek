import * as fs from 'fs';

export const parseFileToJson = (path: string): string => {
  const readFile = fs.readFileSync(path, { encoding: 'utf8' });
  return readFile;
};
