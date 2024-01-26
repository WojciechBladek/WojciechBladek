import { LoginPage } from '../pages/login.page';
import { UserData, UserLoginModelData } from '../test-data/user.data';

describe('Verify login', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.goto();
  });

  it('Login with correct user data', () => {
    // Act
    loginPage.login(UserLoginModelData);

    //Assert
    loginPage.welcomeText.should('include.text', UserData.userName);
  });

  it('Reject login with incorrect password', () => {
    // Arrange
    const errorMessage = `Error: The password you entered for the username ${UserLoginModelData.userEmail} is incorrect. Lost your password?`;

    // Act
    loginPage.login({
      userEmail: UserLoginModelData.userEmail,
      userPassword: 'incorrectPassword',
    });

    // Assert
    loginPage.userNameInput.invoke('attr', 'type').should('eq', 'text');
    loginPage.userPasswordInput.invoke('attr', 'type').should('eq', 'password');

    loginPage.loginError.should('have.text', errorMessage);
  });
});
