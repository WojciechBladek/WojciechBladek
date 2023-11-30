import { Locator, Page } from '@playwright/test';
import { BasePage } from '@_playwright-src/pages/base.page';
import Imap from 'imap';

import { FeedbackPage } from '@_playwright-src/pages/feedback.pages';
import { listenForNewMessages } from 'playwright-src/imap-protocol';
import { LoginUserModel } from 'playwright-src/models/login.model';
import { LoginViaImap } from 'playwright-src/models/user.model';

interface MagicLinkPage {
  title: Locator;
  email: Locator;
  link: Locator;
}

export class LoginPage extends BasePage {
  url = '/auth/magic-link-login';

  emailInput = this.page.locator('loop-input div');
  buttonSendEmail = this.page.getByRole('button', { name: 'Email me a magic link' });
  acceptCookiesButton = this.page.getByRole('button', { name: 'Accept' });
  invalidEmailError = this.page.locator('.loop-input__error');
  emailSendWithSuccess = this.page.locator('.main-content');
  continueWithoutAccountButton = this.page.getByRole('button', { name: 'Continue without an account' });

  constructor(page: Page) {
    super(page);
  }

  static async authenticateToApp(page: Page, loginData: LoginViaImap, imapConfig: Imap.Config): Promise<void> {
    const loginPage = new LoginPage(page);
    await loginPage.generateMagicLink(loginData.email);
    const magicLink = await listenForNewMessages(imapConfig);
    // eslint-disable-next-line playwright/no-networkidle
    await page.goto(magicLink, { waitUntil: 'networkidle' });
    await page.context().storageState({ path: loginData.path });
  }

  async clickContinueWithoutAccountButton(): Promise<FeedbackPage> {
    await this.continueWithoutAccountButton.click();
    return new FeedbackPage(this.page);
  }

  async generateMagicLink(email: string): Promise<void> {
    await this.goto();
    await this.acceptCookiesButton.click();
    await this.emailInput.fill(email);
    await this.buttonSendEmail.first().click();
  }

  async loginWithEmail(userData: LoginUserModel): Promise<void> {
    await this.acceptCookiesButton.click();
    await this.emailInput.fill(userData.email);
    await this.buttonSendEmail.click();
  }

  getEmailSendWithSuccess(): MagicLinkPage {
    return {
      title: this.emailSendWithSuccess.locator('h3'),
      email: this.emailSendWithSuccess.locator('span').first(),
      link: this.emailSendWithSuccess.locator('app-button'),
    };
  }
}
