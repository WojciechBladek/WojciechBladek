import { RegisterUserModel } from '../models/user.model';
import { Locator } from '../support/types';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  url = '/my-account';

  registerEmailInput(): Locator {
    return cy.get('#reg_email');
  }
  registerPasswordInput(): Locator {
    return cy.get('#reg_password');
  }
  registerButton(): Locator {
    return cy.get('input').contains('Register');
  }
  welcomeText(): Locator {
    return cy.get('#post-8 > div.woocommerce > div > p').first();
  }
  emailErrorText(): Locator {
    return cy.get('#post-8 > div.woocommerce > ul > li');
  }
  constructor() {
    super();
  }

  registerNewUser(registerUserData: RegisterUserModel): void {
    this.registerEmailInput().type(registerUserData.userEmail);
    this.registerPasswordInput().type(registerUserData.userPassword);
    this.registerButton().click();
  }

  expectedWelcomeText(userName: string): string {
    return `Hello ${userName} (not ${userName}? Log out)`;
  }
}
