import { expect, test } from '@_playwright-main/fixtures/merge.fixture';
import {
  UserData,
  UserLoginModelData,
} from '@_playwright-main/test-data/user.data';

test.describe('Verify login', () => {
  test('Login with correct credentials @GEN-S1-01', async ({ loginPage }) => {
    // Act
    await loginPage.login(UserLoginModelData);

    // Assert
    await expect(
      loginPage.welcomeText,
      'User is logged and is on my acc page',
    ).toContainText(UserData.userName);
  });
  test('Reject login with incorrect password @GEN-S1-01', async ({
    loginPage,
  }) => {
    // Arrange
    const errorMessage = `Error: The password you entered for the username ${UserLoginModelData.userEmail} is incorrect. Lost your password?`;

    // Act
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
