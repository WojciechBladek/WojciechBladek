import { randomUserData } from '../factories/user.factory';
import { RegisterUser } from '../models/user.model';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUser;
  let userName: string;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('register with correct data and login @GEN_S2_01', async ({}) => {
    // Arrange
    registerUserData = randomUserData();
    userName = registerUserData.userEmail.replace('@example.test', '');

    // Act
    await registerPage.registerNewUser(registerUserData);

    // Assert
    await expect(registerPage.welcomeText).toHaveText(
      registerPage.expectedWelcomeText(userName),
    );
  });

  test('login with new account @GEN_S2_01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(registerUserData);

    // Assert
    await expect(registerPage.welcomeText).toHaveText(
      registerPage.expectedWelcomeText(userName),
    );
  });

  test('not register with incorrect data - email not provided @GEN_S2_02', async ({}) => {
    // Act
    const registerUserData = randomUserData();

    await registerPage.registerNewUser({
      userEmail: '',
      userPassword: registerUserData.userPassword,
    });

    // Assert
    await expect(registerPage.emailErrorText).toBeVisible();
  });
});
