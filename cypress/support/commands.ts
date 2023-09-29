import { randomUserData } from '../../Playwright/factories/user.factory';
import { RegisterPage } from '../pages/register.page';

// commands please read more here:
// https://on.cypress.io/custom-commands

Cypress.Commands.add('login', () => {
  cy.session('Login with new user', () => {
    const registerUserData = randomUserData();
    const registerPage = new RegisterPage();
    registerPage.goto();
    registerPage.registerNewUser(registerUserData);
  });
});
