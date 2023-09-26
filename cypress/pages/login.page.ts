import { UserLogin } from '../models/user.model';
import { Locator } from '../support/types';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  url = '/my-account';

  userNameInput(): Locator {
    return cy.get('#username');
  }
  userPasswordInput(): Locator {
    return cy.get('#password');
  }
  loginButton(): Locator {
    return cy.get('.form-row').contains('Login');
  }
  welcomeText(): Locator {
    return cy.get('#post-8 > div.woocommerce > div > p').first();
  }

  constructor() {
    super();
  }

  async login(userLoginData: UserLogin): Promise<void> {
    this.userNameInput().type(userLoginData.userEmail);
    this.userPasswordInput().type(userLoginData.userPassword);
    this.loginButton().click();
  }
}
