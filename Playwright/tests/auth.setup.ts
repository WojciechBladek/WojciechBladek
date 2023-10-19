import { STORAGE_PATH } from '../../playwright.config';
import { randomUserData } from '../factories/user.factory';
import { RegisterPage } from '../pages/register.page';
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // Arrange
  const registerPage = new RegisterPage(page);
  const userData = randomUserData();

  // Act
  await registerPage.goto();
  await registerPage.registerNewUser(userData);

  await page.context().storageState({ path: STORAGE_PATH });
});
