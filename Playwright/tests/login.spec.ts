import { LoginPage } from '../pages/login.page';
import { User } from '../test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Login to the application', () => {
  let loginPage: LoginPage;

  const userName = User.userEmail;
  const userPassword = User.password;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Login with correct credentials @GEN_S1_01', async ({}) => {
    // Act
    await loginPage.goto();
    await loginPage.login(userName, userPassword);

    // Assert
    await expect(loginPage.welcomeText).toContainText(User.userName);
  });
  test('Reject login with incorrect password @GEN_S1_01', async ({}) => {
    // Arrange
    const incorrectPassword = 'invalidPassword';
    const errorMessage = `Error: The password you entered for the username ${userName} is incorrect. Lost your password?`;

    // Act
    await loginPage.goto();
    await loginPage.login(userName, incorrectPassword);

    // Assert
    await expect(loginPage.loginError).toContainText(errorMessage);
  });
});
