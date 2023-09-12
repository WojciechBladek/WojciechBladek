import { LoginPage } from '../pages/login.page';
import { UserData, UserLoginData } from '../test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Login to the application', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Arrange
    loginPage = new LoginPage(page);
  });

  test('Login with correct credentials @GEN_S1_01', async ({}) => {
    // Act
    await loginPage.goto();
    await loginPage.login(UserLoginData);

    // Assert
    await expect(loginPage.welcomeText).toContainText(UserData.userName);
  });
  test('Reject login with incorrect password @GEN_S1_01', async ({}) => {
    // Arrange
    const incorrectPassword = 'invalidPassword';
    const errorMessage = `Error: The password you entered for the username ${UserLoginData.userEmail} is incorrect. Lost your password?`;

    // Act
    await loginPage.goto();
    await loginPage.login({
      userEmail: UserLoginData.userEmail,
      userPassword: incorrectPassword,
    });

    // Assert
    await expect(loginPage.loginError).toContainText(errorMessage);
  });
});
