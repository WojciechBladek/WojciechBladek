import {
  BASE_URL,
  USER_EMAIL,
  USER_NAME,
  USER_PASSWORD,
} from './config/env.config';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: BASE_URL,
    execTimeout: 10000,
    pageLoadTimeout: 60000,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    viewportHeight: 990,
    viewportWidth: 1440,
    env: {
      userEmail: USER_EMAIL,
      userPassword: USER_PASSWORD,
      userName: USER_NAME,
    },
    experimentalRunAllSpecs: true,
  },
});
