import { expect, test } from '@playwright/test';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';
import { loginAdminViaImap } from '@_playwright-src/test-data/user.data';

test.describe('Verify second menu on Inbox page @smoke', () => {
  test.use({ storageState: loginAdminViaImap.path });
  let inboxPage: InboxPage;

  test.beforeEach(async ({ page }) => {
    inboxPage = new InboxPage(page);
  });

  test('verify replies button', async () => {
    // Arrange
    const exceptedPageTitle = 'Replies';
    const inboxRepliesUrl = '**/replies';

    // Act
    await inboxPage.goto();
    inboxPage = await inboxPage.clickRepliesButton();
    await inboxPage.waitForPageToLoadUrl(inboxRepliesUrl);
    const pageTitle = await inboxPage.getTitle();

    // Assert
    expect(pageTitle, 'Link replies working').toContain(exceptedPageTitle);

    await test.step('verify feedback button', async () => {
      // Arrange
      const exceptedPageTitle = 'Feedback';

      // Act
      inboxPage = await inboxPage.clickFeedbackButton();
      await inboxPage.waitForPageToLoadUrl();
      const pageFeedbackTitle = await inboxPage.getTitle();

      // Assert
      expect(pageFeedbackTitle, 'Link feedback working').toContain(exceptedPageTitle);
    });
  });
});
