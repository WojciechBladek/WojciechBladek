import { expect, test } from '@playwright/test';
import { FeedbackMocks } from '@_playwright-src/mocks/feedback-mocks';

TODO: test.describe('Verify pin function in moderator feedback @admin', () => {
  let feedbackMocks: FeedbackMocks;
  const channels = ['sms', 'messenger', 'whatsapp', 'telegram'];

  test.beforeEach(async ({ page }) => {
    // Arrange
    feedbackMocks = new FeedbackMocks(page);
  });

  for (const channel of channels) {
    test(`Verify pin options ${channel} @admin`, async ({ page }) => {
      // Arrange
      const exceptedTitle = 'Mocked data for testing purposes';
      const inboxPage = await feedbackMocks.mockSocialChannelsFeedbackData(channel);
      const expectedValue = (await inboxPage.channelTabName.first().textContent()).toLocaleLowerCase().trimStart();

      // Act
      await page.getByText(exceptedTitle).isVisible();

      expect(expectedValue).toContain(channel);
      await page.getByRole('button', { name: 'Translate' }).click();
    });
  }
});
