import { UserLoginModel } from '../models/user.model';
import { Locator } from '../support/types';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  url = '/my-account';

  get userNameInput(): Locator {
    return cy.get('#username');
  }
  get userPasswordInput(): Locator {
    return cy.get('#password');
  }
  get loginButton(): Locator {
    return cy.get('[name="login"]');
  }
  get welcomeText(): Locator {
    return cy.get('.woocommerce-MyAccount-content').first();
  }
  get loginError(): Locator {
    return cy.get('.woocommerce-error > li');
  }

  constructor() {
    super();
  }

  login(userLoginData: UserLoginModel): void {
    this.userNameInput.type(userLoginData.userEmail);
    this.userPasswordInput.type(userLoginData.userPassword);
    this.loginButton.click();
  }
}
