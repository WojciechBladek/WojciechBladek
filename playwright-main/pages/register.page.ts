import { RegisterUserModel } from '@_playwright-main/models/user.model';
import { BasePage } from '@_playwright-main/pages/base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/my-account';

  userEmailInput = this.page.getByLabel('Email address *', { exact: true });
  userPasswordInput = this.page.locator('#reg_password');
  registerButton = this.page.getByRole('button', { name: 'Register' });

  welcomeText = this.page
    .locator('#post-8 > div.woocommerce > div > p')
    .first();
  emailErrorText = this.page.getByText(
    'Error: Please provide a valid email address.',
  );

  constructor(page: Page) {
    super(page);
  }

  async registerNewUser(registerUserData: RegisterUserModel): Promise<void> {
    await this.userEmailInput.fill(registerUserData.userEmail);
    await this.userPasswordInput.type(registerUserData.userPassword, {
      delay: 50,
    });
    await this.registerButton.click();
  }

  expectedWelcomeText(userName: string): string {
    return `Hello ${userName} (not ${userName}? Log out)`;
  }
}
