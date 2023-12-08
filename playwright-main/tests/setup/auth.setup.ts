import { test as setup } from '@_playwright-main/fixtures/merge.fixture';

setup('authenticate', async ({ registerNewUser }) => {
  // Act
  registerNewUser;
});
