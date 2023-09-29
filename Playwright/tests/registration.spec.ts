import { randomUserData } from '../factories/user.factory';
import { RegisterUserModel } from '../models/user.model';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Verify register', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;
  let userName: string;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('register with correct data and login @GEN-S2-01', async ({}) => {
    // Arrange
    registerUserData = randomUserData();
    userName = registerUserData.userEmail.replace('@example.tet', '');

    // Act
    await registerPage.registerNewUser(registerUserData);

    // Assert
    await expect(
      registerPage.welcomeText,
      'Should be visible welcome text with userName',
    ).toHaveText(registerPage.expectedWelcomeText(userName));
  });

  test('login with new account @GEN-S2-01', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login(registerUserData);

    // Assert
    await expect(
      registerPage.welcomeText,
      'Should be visible welcome text with userName',
    ).toHaveText(registerPage.expectedWelcomeText(userName));
  });

  test('not register with incorrect data - email not provided @GEN-S2-02', async ({}) => {
    // Act
    const registerUserData = randomUserData();

    await registerPage.registerNewUser({
      userEmail: '',
      userPassword: registerUserData.userPassword,
    });

    // Assert
    await expect(registerPage.userEmailInput).toHaveAttribute('type', 'email');
    await expect(registerPage.userPasswordInput).toHaveAttribute(
      'type',
      'password',
    );
    await expect(
      registerPage.emailErrorText,
      'Should be displayed invalid email text error',
    ).toBeVisible();
  });
});
