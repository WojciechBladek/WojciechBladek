import { expect, test } from '@playwright/test';
import { prepareRandomFeedbackData } from '@_playwright-src/factories/provide-feedback.factory';
import { EditFeedbackFixture } from '@_playwright-src/fixtures/edit-feedback-api.fixtures';
import { FeedbackFixture } from '@_playwright-src/fixtures/feedback-api.fixtures';
import { CreateAndEditFeedback, ProvideFeedbackFixture } from '@_playwright-src/fixtures/provide-feedback-api.fixtures';
import { FeedbackPage } from '@_playwright-src/pages/feedback.pages';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';
import {} from '@_playwright-src/test-data/user.data';
import { ReviewFeedbackView } from '@_playwright-src/views/review-feedback.view';
import { StoryDetailsView } from '@_playwright-src/views/story-details.view';

test.describe('Verify edited feedback, publish, reject, edit @admin', () => {
  let provideFeedbackFixture: ProvideFeedbackFixture;
  let editFeedbackFixture: EditFeedbackFixture;
  let feedbackId: CreateAndEditFeedback;
  let reviewFeedbackView: ReviewFeedbackView;

  test.beforeEach(async ({ page, request }) => {
    // Arrange
    provideFeedbackFixture = new ProvideFeedbackFixture(request);
    editFeedbackFixture = new EditFeedbackFixture(request, page);
    reviewFeedbackView = new ReviewFeedbackView(page);

    const inboxPage = new InboxPage(page);

    // Act
    feedbackId = await provideFeedbackFixture.createAndEditFeedback();
    inboxPage.url = `inbox/stories/story/web/${feedbackId.storyID}/review`;
    await inboxPage.goto();
  });

  test.afterAll(async ({ request }) => {
    const feedbackFixture = new FeedbackFixture(request);
    await feedbackFixture.unpublishFeedback(feedbackId.storyID);
  });

  test('Edited feedback have pending-edit status', async ({}) => {
    // Arrange
    const exceptedStatus = 'pending_edit';

    // Act
    const feedbackId = await provideFeedbackFixture.createAndPublishFeedback();
    await editFeedbackFixture.setFeedbackStatusEdited(feedbackId);
    const webFeedbackDetails = await provideFeedbackFixture.getWebFeedbackDetails(feedbackId);

    // Assert
    expect(webFeedbackDetails.status, 'Feedback status changed to pending-edit').toEqual(exceptedStatus);
  });

  test('Verify if textarea for edit is displayed after click toggle', async ({}) => {
    // Act
    await reviewFeedbackView.editFeedbackToggleButton.click();

    // Assert
    await expect(reviewFeedbackView.editFeedbackToggleButton).toBeChecked();
    await expect(reviewFeedbackView.feedbackEditContentInput).toBeVisible();
  });

  test('Edit original feedback and save changes', async ({}) => {
    // Arrange
    const randomFeedbackData = prepareRandomFeedbackData();
    const exceptedContent = randomFeedbackData.body;

    // Act
    await reviewFeedbackView.saveEditedFeedbackContent(exceptedContent);

    //Assert
    await expect(reviewFeedbackView.feedbackContentInput, 'On last step new content data is displayed').toHaveValue(exceptedContent);
  });

  test('Edit original feedback and publish', async ({ page }) => {
    // Arrange
    const randomFeedbackData = prepareRandomFeedbackData();
    const exceptedContent = randomFeedbackData.body;
    const feedbackPage = new FeedbackPage(page);

    // Act
    await reviewFeedbackView.saveEditedFeedbackContent(exceptedContent);
    const inboxPage = await reviewFeedbackView.clickPublishFeedbackButton();
    await expect(inboxPage.feedbackPublishedPopUp).toBeVisible();
    await feedbackPage.goto();

    // Assert
    await expect(page.getByText(exceptedContent), 'Edited content is displayed on dashboard').toBeVisible();

    await test.step('Re-edit edited original content from feedback and publish', async () => {
      // Arrange
      const storyDetailsView = new StoryDetailsView(page);
      const randomFeedbackData = prepareRandomFeedbackData();
      const exceptedContent = randomFeedbackData.body;

      // Act
      await storyDetailsView.goToFeedback(feedbackId.storyID);
      await storyDetailsView.clickEditFeedback();
      await reviewFeedbackView.feedbackEditContentInput.fill(exceptedContent);
      await reviewFeedbackView.translateButton.click();
      const inboxPage = await reviewFeedbackView.clickPublishFeedbackButton();
      await expect(inboxPage.feedbackPublishedPopUp).toBeVisible();
      await feedbackPage.goto();

      // Assert
      await expect(page.getByText(exceptedContent), 'Re-edited content is displayed on dashboard').toBeVisible();
    });
  });
  test('Check edit input signs validation ', async ({}) => {
    // Arrange
    const randomFeedbackData = prepareRandomFeedbackData(4);

    // Act
    await reviewFeedbackView.saveEditedFeedbackContent(randomFeedbackData.body);

    //Assert
    await expect(reviewFeedbackView.invalidContentLengthPopUp, 'Alert popup with wrong length validation is displayed').toBeVisible();
  });

  test('Try Publish empty edited content', async ({}) => {
    // Act
    await reviewFeedbackView.saveEditedFeedbackContent();

    //Assert
    await expect(reviewFeedbackView.invalidContentLengthPopUp, 'Alert popup with wrong length validation is displayed').toBeVisible();
  });
});
