import { Page } from '@playwright/test';
import { BasePage } from '@_playwright-src/pages/base.page';

export class InboxPage extends BasePage {
  url = '/inbox/stories';
  repliesButton = this.page.getByRole('link').filter({ hasText: 'Replies' });
  feedbackButton = this.page.getByRole('link').filter({ hasText: 'Feedback' });
  requestButton = this.page.locator('li').filter({ hasText: 'Requests' });
  rejectionsButton = this.page.locator('li').filter({ hasText: 'Rejections' });
  openFeedback = this.page.getByRole('row').filter({ hasText: 'Not started' }).filter({ hasText: 'Web' });
  channelTabName = this.page.getByTestId('channelInfo')

  feedbackPublishedPopUp = this.page.getByLabel('Feedback has been published.');
  feedbackRejectedPopUp = this.page.getByLabel('Feedback has been rejected.');

  constructor(page: Page) {
    super(page);
  }

  async clickRepliesButton(): Promise<InboxPage> {
    await this.repliesButton.click();
    return new InboxPage(this.page);
  }

  async clickFeedbackButton(): Promise<InboxPage> {
    await this.feedbackButton.click();
    return new InboxPage(this.page);
  }
}
