import { expect, test } from '@playwright/test';
import { OutboxPage } from '@_playwright-src/pages/outbox.pages';
import { loginAdminViaImap } from '@_playwright-src/test-data/user.data';

test.describe('Verify second menu on Outbox page @smoke', () => {
  test.use({ storageState: loginAdminViaImap.path });
  let outboxPage: OutboxPage;

  test.beforeEach(async ({ page }) => {
    outboxPage = new OutboxPage(page);
    await outboxPage.goto();
  });

  test('verify in-progress button', async () => {
    // Arrange
    const exceptedPageTitle = 'In progress';
    const outboxProgressUrl = 'outbox/in-progress';

    // Act
    await outboxPage.inProgressButton.click();
    await outboxPage.waitForPageToLoadUrl(outboxProgressUrl);
    const pageTitle = await outboxPage.getTitle();

    // Assert
    expect(pageTitle, 'Link in-progress working').toContain(exceptedPageTitle);

    await test.step('verify pending recording button', async () => {
      // Arrange
      const exceptedPageTitle = 'Pending recording';

      // Act
      outboxPage = await outboxPage.clickPendingRecordingButton();
      await outboxPage.waitForPageToLoadUrl();
      const pageTitle = await outboxPage.getTitle();

      // Assert
      expect(pageTitle, 'Link pending recording working').toContain(exceptedPageTitle);
    });
  });
  test('verify buttons are disabled', async () => {
    // Assert
    await expect(outboxPage.archiveDisabledButton, 'Button archive is disabled').toHaveAttribute('class', /blocked/);
  });
});
