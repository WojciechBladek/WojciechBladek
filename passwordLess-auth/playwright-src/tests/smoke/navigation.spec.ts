import { expect, test } from '@playwright/test';
import { FeedbackPage } from '@_playwright-src/pages/feedback.pages';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';
import { OutboxPage } from '@_playwright-src/pages/outbox.pages';
import { StatisticsPage } from '@_playwright-src/pages/statistics.pages';
import { MainMenuComponent } from '@_playwright-src/components/main-menu.component';
import { loginAdminViaImap } from '@_playwright-src/test-data/user.data';

test.describe('Verify main menu @admin', () => {
  test.use({ storageState: loginAdminViaImap.path });
  let mainMenuComponent: MainMenuComponent;
  let feedbackPage: FeedbackPage;
  let statisticsPage: StatisticsPage;
  let inboxPage: InboxPage;
  let outboxPage: OutboxPage;

  test.beforeEach(async ({ page }) => {
    mainMenuComponent = new MainMenuComponent(page);
    feedbackPage = new FeedbackPage(page);
    statisticsPage = new StatisticsPage(page);
    inboxPage = new InboxPage(page);
    outboxPage = new OutboxPage(page);
  });

  test('verify statistics menu button', async () => {
    // Arrange
    const exceptedPageTitle = 'Statistics';

    // Act
    await feedbackPage.goto();
    await mainMenuComponent.statisticsPage.click();
    await statisticsPage.waitForPageToLoadUrl();
    const pageTitle = await statisticsPage.getTitle();

    // Assert
    expect(pageTitle).toContain(exceptedPageTitle);
  });

  test('verify feedback menu button', async () => {
    // Arrange
    const exceptedPageTitle = 'Feedback';

    // Act
    await statisticsPage.goto();
    await mainMenuComponent.feedbackPage.click();
    await feedbackPage.waitForPageToLoadUrl();
    const pageTitle = await feedbackPage.getTitle();

    // Assert
    expect(pageTitle).toContain(exceptedPageTitle);
  });

  test('verify inbox menu button', async () => {
    // Arrange
    const exceptedPageTitle = 'Inbox';

    // Act
    await feedbackPage.goto();
    await mainMenuComponent.inboxPage.click();
    await inboxPage.waitForPageToLoadUrl();
    const pageTitle = await inboxPage.getTitle();

    // Assert
    expect(pageTitle).toContain(exceptedPageTitle);
  });

  test('verify outbox menu button', async ({}) => {
    // Arrange
    const exceptedPageTitle = 'Outbox';

    // Act
    await feedbackPage.goto();
    await mainMenuComponent.outboxPage.click();
    await outboxPage.waitForPageToLoadUrl();
    const pageTitle = await outboxPage.getTitle();

    // Assert
    expect(pageTitle).toContain(exceptedPageTitle);
  });
});
