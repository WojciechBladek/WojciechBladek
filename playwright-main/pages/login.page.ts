import { UserLoginModel } from '@_playwright-main/models/user.model';
import { BasePage } from '@_playwright-main/pages/base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/my-account';

  userEmailInput = this.page.getByLabel('Username or email address *');
  userPasswordInput = this.page.locator('#password');
  loginButton = this.page.getByRole('button', { name: 'Login' });
  welcomeText = this.page
    .locator('#post-8 > div.woocommerce > div > p')
    .first();
  loginError = this.page.locator('#post-8 > div.woocommerce > ul');

  constructor(page: Page) {
    super(page);
  }
  async login(userLoginData: UserLoginModel): Promise<void> {
    await this.userEmailInput.fill(userLoginData.userEmail);
    await this.userPasswordInput.fill(userLoginData.userPassword);
    await this.loginButton.click();
  }
}
