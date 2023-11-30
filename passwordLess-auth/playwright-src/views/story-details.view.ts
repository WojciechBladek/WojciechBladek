import { APIResponse, Page } from '@playwright/test';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';
import { RejectFeedbackModal } from '@_playwright-src/views/reject-feedback.view';

export class StoryDetailsView {
  rejectFeedbackModal = new RejectFeedbackModal(this.page);

  openFeedbackOptions = this.page.getByTestId('options');
  editFeedback = this.page.getByTestId('edit');

  constructor(private page: Page) {}

  async clickEditFeedback(): Promise<InboxPage> {
    await this.openFeedbackOptions.click();
    await this.editFeedback.click();
    await this.page.waitForURL('**/review');
    return new InboxPage(this.page);
  }

  async goToFeedback(feedbackId: APIResponse): Promise<InboxPage> {
    await this.page.goto(`story/details/${feedbackId}`);
    return new InboxPage(this.page);
  }
}
