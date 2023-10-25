import { expect, test } from '@playwright/test';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';
import { loginAdminViaImap } from '@_playwright-src/test-data/user.data';

test.describe('Verify second menu on Inbox page @admin', () => {
  test.use({ storageState: loginAdminViaImap.path });
  let inboxPage: InboxPage;

  test.beforeEach(async ({ page }) => {
    inboxPage = new InboxPage(page);
  });

  test('verify replies button', async () => {
    // Arrange
    const exceptedPageTitle = 'Replies';
    const inboxRepliesUrl = 'inbox/replies';

    // Act
    await inboxPage.goto();
    await inboxPage.repliesButton.click();
    await inboxPage.waitForPageToLoadUrl(inboxRepliesUrl);
    const pageTitle = await inboxPage.getTitle();

    // Assert
    expect(pageTitle, 'Link replies working').toContain(exceptedPageTitle);

    await test.step('verify feedback button', async () => {
      // Arrange
      const exceptedPageTitle = 'Feedback';

      // Act
      await inboxPage.feedbackButton.click();
      await inboxPage.waitForPageToLoadUrl();
      const pageFeedbackTitle = await inboxPage.getTitle();

      // Assert
      expect(pageFeedbackTitle, 'Link feedback working').toContain(exceptedPageTitle);
    });
  });

  test.fixme('verify buttons are disabled', async () => {
    // Act
    await inboxPage.goto();

    // Assert
    //TODO: developer task, button should have attribute is disabled.
    await expect(inboxPage.rejectionsButton, 'Button rejections is disabled').toBeDisabled();
    await expect(inboxPage.requestButton, 'Button requests is disabled').toBeDisabled();
  });
});
