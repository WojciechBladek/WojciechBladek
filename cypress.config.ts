import { defineConfig } from 'cypress';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    execTimeout: 30000,
    pageLoadTimeout: 60000,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    viewportHeight: 990,
    viewportWidth: 1440,
    env: {
      userEmail: process.env.USER_EMAIL,
      userPassword: process.env.USER_PASSWORD,
      userName: process.env.USER_NAME,
    },
  },
});
