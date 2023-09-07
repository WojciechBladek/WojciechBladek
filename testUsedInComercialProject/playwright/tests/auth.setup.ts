import { test as setup } from '@playwright/test';
import { imapConfigAdmin, imapConfigUser } from 'mailBox';
import { Users } from 'playwright/fixtures/users.fixtures';
import { LoginPage } from 'playwright/pages/login.pages';

setup('authenticate as admin', async ({ page }) => {
  await LoginPage.authenticateToApp(
    page,
    Users.userAdmin,
    Users.authFileAdmin,
    imapConfigAdmin,
  );
});

setup('authenticate as user', async ({ page }) => {
  await LoginPage.authenticateToApp(
    page,
    Users.user,
    Users.authFileUser,
    imapConfigUser,
  );
});

setup('authenticate as unlogged user', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.context().storageState({ path: Users.authFileUnlogged });
});
