import { LoginPage } from '../pages/login.page';
import { UserData, UserLoginModelData } from '../test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Login with correct credentials @GEN-S1-01', async ({}) => {
    // Act
    await loginPage.goto();
    await loginPage.login(UserLoginModelData);

    // Assert
    await expect(
      loginPage.welcomeText,
      'User is logged and is on my acc page',
    ).toContainText(UserData.userName);
  });
  test('Reject login with incorrect password @GEN-S1-01', async ({}) => {
    // Arrange
    const errorMessage = `Error: The password you entered for the username ${UserLoginModelData.userEmail} is incorrect. Lost your password?`;

    // Act
    await loginPage.goto();
    await loginPage.login({
      userEmail: UserLoginModelData.userEmail,
      userPassword: 'invalidPassword',
    });

    // Assert
    await expect(loginPage.userEmailInput).toHaveAttribute('type', 'text');
    await expect(loginPage.userPasswordInput).toHaveAttribute(
      'type',
      'password',
    );

    await expect(
      loginPage.loginError,
      'User not invalid credentials error text is displayed',
    ).toHaveText(errorMessage);
  });
});
