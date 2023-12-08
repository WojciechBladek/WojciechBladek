import { randomUserData } from '../../playwright-main/factories/user.factory';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';

describe('Verify register', () => {
  const registerUserData = randomUserData();
  const userName = registerUserData.userEmail.replace('@example.tet', '');

  const registerPage = new RegisterPage();

  beforeEach(() => {
    registerPage.goto();
  });

  it('register with correct data and login', () => {
    // Act
    registerPage.registerNewUser(registerUserData);

    // Assert
    registerPage
      .welcomeText()
      .should('have.text', registerPage.expectedWelcomeText(userName));
  });

  it('login with new account', () => {
    // Arrange
    const loginPage = new LoginPage();

    // Act
    loginPage.login(registerUserData);

    // Assert
    registerPage
      .welcomeText()
      .should('have.text', registerPage.expectedWelcomeText(userName));
  });

  it('not register with incorrect data - email not provided', () => {
    // Arrange
    const registerUserData = randomUserData();
    registerUserData.userEmail = ' ';
    const errorMessage = 'Error: Please provide a valid email address.';

    // Act
    registerPage.registerNewUser(registerUserData);

    // Assert
    registerPage
      .registerEmailInput()
      .invoke('attr', 'type')
      .should('eq', 'email');
    registerPage
      .registerPasswordInput()
      .invoke('attr', 'type')
      .should('eq', 'password');

    registerPage.emailErrorText().should('be.visible');
    registerPage.emailErrorText().should('have.text', errorMessage);
  });
});
