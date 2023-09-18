/* eslint-disable */
import { Page } from '@playwright/test';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import Imap from 'imap';
import { listenForNewMessages } from 'mailBox';

export class LoginPage {
  constructor(private page: Page) {}

  magicLinkInput = this.page.getByTestId('email');
  button = this.page.getByTestId('button');
  userProfileIcon = this.page.getByTestId('login-status-link');
  userProfileLogout = this.page.getByTestId('logout');

  static async authenticateToApp(
    page: Page,
    userRole: string,
    path: string,
    config: Imap.Config,
  ) {
    const loginPage = new LoginPage(page);
    await loginPage.generateMagicLink(userRole);
    const magicLink = await listenForNewMessages(config);
    await page.goto(magicLink, { waitUntil: 'networkidle' });
    await page.context().storageState({ path: path });
  }

  async generateMagicLink(emailId: string) {
    await this.page.goto('/auth/magic-link-login', {
      waitUntil: 'networkidle',
    });
    await this.page.getByRole('button', { name: 'Accept' }).click();
    await this.magicLinkInput.fill(emailId);
    await this.button.first().click();
  }
}
