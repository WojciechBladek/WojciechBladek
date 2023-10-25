import { Page } from 'playwright';

export class MainMenuComponent {
  feedbackPage = this.page.locator('.header__nav-link').nth(0);
  statisticsPage = this.page.locator('.header__nav-link').nth(1);
  inboxPage = this.page.locator('.header__nav-link').nth(2);
  outboxPage = this.page.locator('.header__nav-link').nth(3);

  constructor(private page: Page) {}
}
