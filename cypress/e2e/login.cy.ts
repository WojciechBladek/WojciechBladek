import { LoginPage } from '../pages/login.page';
import { UserData, UserLoginData } from '../test-data/user.data';

describe('Verify login', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.goto();
  });

  it('Login with correct user data', () => {
    // Act
    loginPage.login(UserLoginData);

    //Assert
    loginPage.welcomeText().should('include.text', UserData.userName);
  });

  it('Reject login with incorrect password', () => {
    // Arrange
    const errorMessage = `Error: The password you entered for the username ${UserLoginData.userEmail} is incorrect. Lost your password?`;

    // Act
    loginPage.login({
      userEmail: UserLoginData.userEmail,
      userPassword: 'incorrectPassword',
    });

    // Assert
    loginPage.userNameInput().invoke('attr', 'type').should('eq', 'text');
    loginPage
      .userPasswordInput()
      .invoke('attr', 'type')
      .should('eq', 'password');

    loginPage.loginError().should('have.text', errorMessage);
  });
});
