import fs from 'fs';

const localisation = fs.readFileSync('src/assets/localisation/en.json', { encoding: 'utf8' });
const translations = JSON.parse(localisation);
const auth = translations.auth;

export const lokalise = {
  auth,
};
