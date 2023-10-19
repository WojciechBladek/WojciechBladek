import { BASE_URL } from './env.config';
import { defineConfig, devices } from '@playwright/test';

export const STORAGE_PATH = 'playwright/.auth/user.json';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './Playwright/tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
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
