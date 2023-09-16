import { LoginPage } from '../pages/login.page';
import { UserLoginData } from '../test-data/user.data';
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
//test.use({ storageState: 'playwright//.auth/user.json' });
setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(UserLoginData);
  await page.context().storageState({ path: authFile });
});
