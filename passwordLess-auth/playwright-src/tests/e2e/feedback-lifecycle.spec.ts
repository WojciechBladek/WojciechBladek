import { APIResponse, expect, test } from '@playwright/test';
import { FeedbackData, ProvideFeedbackFixture } from '@_playwright-src/fixtures/provide-feedback.fixtures';
import { FeedbackPage } from '@_playwright-src/pages/feedback.pages';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';
import { adminPath } from '@_playwright-src/test-data/user.data';
import { RejectFeedbackModal } from '@_playwright-src/views/reject-feedback.view';
import { ReviewFeedbackView } from '@_playwright-src/views/review-feedback.view';
import { StoryDetailsView } from '@_playwright-src/views/story-details.view';

test.describe('Verify feedback publish and reject @OL-3630 @admin', () => {
  // Arrange
  let inboxPage: InboxPage;
  let reviewFeedbackView: ReviewFeedbackView;
  let rejectFeedbackModal: RejectFeedbackModal;
  let getFeedbackId: APIResponse;
  let translatePageUrl: string;
  let createFeedbackWithApi: FeedbackData;

  test.beforeEach(async ({ page, request }) => {
    // Arrange
    inboxPage = new InboxPage(page);
    reviewFeedbackView = new ReviewFeedbackView(page);
    rejectFeedbackModal = new RejectFeedbackModal(page);
    const provideFeedbackFixture = new ProvideFeedbackFixture(request);

    // Act
    createFeedbackWithApi = await provideFeedbackFixture.createFeedbackViaApi();
    await expect(createFeedbackWithApi.response).toBeOK();
    getFeedbackId = await provideFeedbackFixture.getFeedbackListFromInbox(adminPath);
    inboxPage.url = `inbox/stories/story/web/${getFeedbackId}/review`;
    translatePageUrl = `inbox/stories/story/web/${getFeedbackId}/translate`;
    await inboxPage.goto();
  });

  test('Publish feedback @LOOP_R03_01', async ({ page }) => {
    // Act
    await reviewFeedbackView.publishFeedback();

    //Assert
    await expect(inboxPage.feedbackPublishedPopUp).toBeVisible();

    await test.step('Reject published feedback', async () => {
      // Arrange
      const storyDetailsView = new StoryDetailsView(page);

      // Act
      await storyDetailsView.goToFeedback(getFeedbackId);
      await storyDetailsView.rejectFeedback();

      // Assert
      await expect(inboxPage.feedbackRejectedPopUp, 'Feedback has been rejected.').toBeVisible();
    });
  });

  test('Published feedback is visible on feedback page @LOOP_R03_01', async ({ page }) => {
    // Arrange
    const feedbackPage = new FeedbackPage(page);
    const exceptedFeedback = createFeedbackWithApi.content;

    // Act
    await reviewFeedbackView.publishFeedback();
    await expect(inboxPage.feedbackPublishedPopUp).toBeVisible();
    await feedbackPage.goto();

    //Assert
    await expect(page.getByText(exceptedFeedback)).toBeVisible();
  });

  test('Failure publish feedback @LOOP_R03_01', async ({}) => {
    // Act
    await reviewFeedbackView.translateButton.click();

    //Assert
    await expect(reviewFeedbackView.alertPopUp).toBeVisible();
  });

  test('Reject feedback @OL-3630', async ({}) => {
    // Act
    await reviewFeedbackView.rejectButton.click();
    await rejectFeedbackModal.selectReasonAndRejectFeedback();

    // Assert
    await expect(inboxPage.feedbackRejectedPopUp, 'Feedback has been rejected.').toBeVisible();
  });

  test('Reject feedback with provide feedback data @OL-3630', async ({}) => {
    // Arrange
    const reasonText = 'The feedback has offensive or discriminatory language in it';

    // Act
    await reviewFeedbackView.rejectButton.click();
    await rejectFeedbackModal.selectReasonAndRejectFeedback(reasonText);

    // Assert
    await expect(inboxPage.feedbackRejectedPopUp, 'Feedback has been rejected.').toBeVisible();
  });

  test('Failure Reject feedback with invalid provide feedback data @OL-3630', async ({}) => {
    // Arrange
    const reasonText = '0';

    // Act
    await reviewFeedbackView.rejectButton.click();
    await rejectFeedbackModal.selectReasonAndRejectFeedback(reasonText);

    // Assert
    await expect(inboxPage.feedbackRejectedPopUp, 'Feedback has been rejected.').toBeHidden();
  });

  test('Failure Reject feedback @OL-3630', async ({}) => {
    // Act
    await reviewFeedbackView.rejectButton.click();
    await rejectFeedbackModal.rejectButton.click();

    // Assert
    await expect(inboxPage.feedbackRejectedPopUp, 'Feedback has been rejected.').toBeHidden();
  });

  test('Failure Reject feedback on last step @OL-3630', async ({}) => {
    // Act
    await reviewFeedbackView.goToTranslateStep();
    await inboxPage.waitForPageToLoadUrl(translatePageUrl);
    await reviewFeedbackView.rejectButton.click();
    await rejectFeedbackModal.rejectButton.click();

    // Assert
    await expect(inboxPage.feedbackRejectedPopUp, 'Feedback has been rejected.').toBeHidden();
  });

  test('Reject feedback on last step @OL-3630', async ({}) => {
    // Act
    await reviewFeedbackView.goToTranslateStep();
    await inboxPage.waitForPageToLoadUrl(translatePageUrl);
    await reviewFeedbackView.rejectButton.click();
    await rejectFeedbackModal.selectReasonAndRejectFeedback();

    // Assert
    await expect(inboxPage.feedbackRejectedPopUp, 'Feedback has been rejected.').toBeVisible();
  });

  test('Reject feedback with provide feedback data on last step @OL-3630', async ({}) => {
    // Arrange
    const reasonText = 'The feedback has offensive or discriminatory language in it';

    // Act
    await reviewFeedbackView.goToTranslateStep();
    await inboxPage.waitForPageToLoadUrl(translatePageUrl);
    await reviewFeedbackView.rejectButton.click();
    await rejectFeedbackModal.selectReasonAndRejectFeedback(reasonText);

    // Assert
    await expect(inboxPage.feedbackRejectedPopUp, 'Feedback has been rejected.').toBeVisible();
  });
});
