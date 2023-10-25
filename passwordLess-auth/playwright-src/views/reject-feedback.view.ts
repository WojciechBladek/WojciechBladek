import { Page } from '@playwright/test';

export class RejectFeedbackModal {
  reasonOption = this.page.getByTestId('checkbox-wrapper-app-checkbox').locator('.checkbox');
  rejectButton = this.page.getByTestId('reject-form-app-button-submit');
  feedbackOptionYesOrNo = this.page.getByTestId('reject-form-feedback-yes-loop-new-story-radio');
  feedbackDiv = this.page.getByTestId('reject-form-feedback-loop-textarea');
  feedbackContentInput = this.feedbackDiv.getByTestId('loop-textarea-textarea');

  constructor(private page: Page) {}

  async selectReasonAndRejectFeedback(reasonText?: string): Promise<void> {
    for (let i = 0; i < 4; i++) {
      await this.reasonOption.nth(i).click();
    }
    if (reasonText) {
      await this.feedbackOptionYesOrNo.filter({ hasText: 'Yes' }).click();
      await this.feedbackContentInput.fill(reasonText);
    }
    await this.rejectButton.click();
  }
}
