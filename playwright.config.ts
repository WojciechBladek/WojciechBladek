import { BASE_URL } from '@_config/env.config';
import { defineConfig, devices } from '@playwright/test';

export const STORAGE_PATH = 'playwright/.auth/user.json';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './playwright-main/tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  retries: 1,
  workers: undefined,
  reporter: [
    ['html'],
    ['github'],
    ['json', { outputFile: './playwright-report/results.json' }],
    [
      'junit',
      {
        outputFile: './playwright-report/results.xml',
        embedAnnotationsAsProperties: true,
      },
    ],
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium-logged',
      grep: /@logged/,
      use: { ...devices['Desktop Chrome'], storageState: STORAGE_PATH },
      dependencies: ['setup'],
    },
    {
      name: 'chromium-non-logged',
      grepInvert: /@logged/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
