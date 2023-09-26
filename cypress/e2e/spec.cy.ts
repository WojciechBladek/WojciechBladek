import { LoginPage } from '../pages/login.page';
import { UserData, UserLoginData } from '../test-data/user.data';

describe('template spec', () => {
  it('passes', async () => {
    // Arrange
    const loginPage = new LoginPage();

    // Act
    await loginPage.goto();
    await loginPage.login(UserLoginData);

    //Assert
    loginPage.welcomeText().should('include.text', UserData.userName);
  });
});
