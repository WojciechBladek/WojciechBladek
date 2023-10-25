import { Page } from '@playwright/test';
import { BasePage } from '@_playwright-src/pages/base.page';

export class InboxPage extends BasePage {
  url = '/inbox/stories';
  repliesButton = this.page.getByRole('link').filter({ hasText: 'Replies' });
  feedbackButton = this.page.getByRole('link').filter({ hasText: 'Feedback' });
  requestButton = this.page.locator('li').filter({ hasText: 'Requests' });
  rejectionsButton = this.page.locator('li').filter({ hasText: 'Rejections' });
  openFeedback = this.page.getByRole('row').filter({ hasText: 'Not started' }).filter({ hasText: 'Web' });
  feedbackPublishedPopUp = this.page.getByLabel('Feedback has been published.');
  feedbackRejectedPopUp = this.page.getByLabel('Feedback has been rejected.');

  constructor(page: Page) {
    super(page);
  }
}
