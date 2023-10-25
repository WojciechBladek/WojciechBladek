import { APIResponse, Page } from '@playwright/test';
import { RejectFeedbackModal } from '@_playwright-src/views/reject-feedback.view';

export class StoryDetailsView {
  rejectFeedbackModal = new RejectFeedbackModal(this.page);

  openFeedbackOptions = this.page.getByTestId('options');
  unpublishFeedback = this.page.getByTestId('unpublish');
  editFeedback = this.page.getByTestId('edit');

  constructor(private page: Page) {}

  async rejectFeedback() {
    await this.openFeedbackOptions.click();
    await this.unpublishFeedback.click();
    await this.rejectFeedbackModal.selectReasonAndRejectFeedback();
  }

  async goToFeedback(feedbackId: APIResponse) {
    await this.page.goto(`story/details/${feedbackId}`);
  }
}
