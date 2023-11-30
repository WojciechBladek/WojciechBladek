import { FeedbackPage } from '@_playwright-src/pages/feedback.pages';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';
import { OutboxPage } from '@_playwright-src/pages/outbox.pages';
import { StatisticsPage } from '@_playwright-src/pages/statistics.pages';
import { Page } from 'playwright';

export class MainMenuComponent {
  feedbackPage = this.page.locator('.header__nav-link').nth(0);
  statisticsPage = this.page.locator('.header__nav-link').nth(1);
  inboxPage = this.page.locator('.header__nav-link').nth(2);
  outboxPage = this.page.locator('.header__nav-link').nth(3);

  constructor(private page: Page) {}

  async clickFeedbackPageButton(): Promise<FeedbackPage> {
    await this.feedbackPage.waitFor();
    await this.feedbackPage.click();
    return new FeedbackPage(this.page);
  }
  async clickStatisticsPageButton(): Promise<StatisticsPage> {
    await this.statisticsPage.waitFor();
    await this.statisticsPage.click();
    return new StatisticsPage(this.page);
  }
  async clickInboxPageButton(): Promise<InboxPage> {
    await this.inboxPage.waitFor();
    await this.inboxPage.click();
    return new InboxPage(this.page);
  }
  async clickOutboxPageButton(): Promise<OutboxPage> {
    await this.outboxPage.waitFor();
    await this.outboxPage.click();
    return new OutboxPage(this.page);
  }
}
