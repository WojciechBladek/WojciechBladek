import { expect, test } from '@playwright/test';
import { MainMenuComponent } from '@_playwright-src/components/main-menu.component';
import { FeedbackPage } from '@_playwright-src/pages/feedback.pages';
import { loginAdminViaImap } from '@_playwright-src/test-data/user.data';

test.describe('Verify main menu @smoke', () => {
  test.use({ storageState: loginAdminViaImap.path });
  let mainMenuComponent: MainMenuComponent;

  test.beforeEach(async ({ page }) => {
    mainMenuComponent = new MainMenuComponent(page);
    const feedbackPage = new FeedbackPage(page);

    await feedbackPage.goto();
  });

  test('verify statistics menu button', async () => {
    // Arrange
    const exceptedPageTitle = 'Statistics';

    // Act
    const statisticsPage = await mainMenuComponent.clickStatisticsPageButton();
    await statisticsPage.waitForPageToLoadUrl();
    const pageTitle = await statisticsPage.getTitle();

    // Assert
    expect(pageTitle).toContain(exceptedPageTitle);

    await test.step('verify feedback menu button', async () => {
      // Arrange
      const exceptedPageTitle = 'Feedback';

      // Act
      await statisticsPage.goto();
      const feedbackPage = await mainMenuComponent.clickFeedbackPageButton();
      await feedbackPage.waitForPageToLoadUrl();
      const pageTitle = await feedbackPage.getTitle();

      // Assert
      expect(pageTitle).toContain(exceptedPageTitle);
    });
  });

  test('verify inbox menu button', async () => {
    // Arrange
    const exceptedPageTitle = 'Inbox';

    // Act
    const inboxPage = await mainMenuComponent.clickInboxPageButton();
    await inboxPage.waitForPageToLoadUrl();
    const pageTitle = await inboxPage.getTitle();

    // Assert
    expect(pageTitle).toContain(exceptedPageTitle);
  });

  test('verify outbox menu button', async ({}) => {
    // Arrange
    const exceptedPageTitle = 'Outbox';

    // Act
    const outboxPage = await mainMenuComponent.clickOutboxPageButton();
    await outboxPage.waitForPageToLoadUrl();
    const pageTitle = await outboxPage.getTitle();

    // Assert
    expect(pageTitle).toContain(exceptedPageTitle);
  });
});
