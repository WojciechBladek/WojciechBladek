import { STORAGE_PATH } from '../../playwright.config';
import { randomUserData } from '../factories/user.factory';
import { RegisterPage } from '../pages/register.page';
import { pageObjectTest } from './page-object.fixture';

interface Register {
  registerNewUser: RegisterPage;
}

export const registerUserTest = pageObjectTest.extend<Register>({
  registerNewUser: async ({ registerPage, page }, use) => {
    const userData = randomUserData();

    await registerPage.goto();
    await registerPage.registerNewUser(userData);

    await page.context().storageState({ path: STORAGE_PATH });
    await use(registerPage);
  },
});
