import { expect, test } from '@playwright/test';
import { StatisticsPage } from '@_playwright-src/pages/statistics.pages';
import { loginAdminViaImap } from '@_playwright-src/test-data/user.data';

test.describe('Verify second menu on Statistics page @admin', () => {
  test.use({ storageState: loginAdminViaImap.path });
  let statisticsPage: StatisticsPage;

  test.beforeEach(async ({ page }) => {
    statisticsPage = new StatisticsPage(page);
  });

  test('verify sensitive cases button', async () => {
    // Arrange
    const exceptedPageTitle = 'Sensitive cases';
    const sensitiveCasesUrl = 'statistics/sensitive-cases';

    // Act
    await statisticsPage.goto();
    await statisticsPage.sensitiveCasesButton.click();
    await statisticsPage.waitForPageToLoadUrl(sensitiveCasesUrl);
    const pageTitle = await statisticsPage.getTitle();

    // Assert
    expect(pageTitle, 'Link sensitive cases working').toContain(exceptedPageTitle);
  });

  test('verify open feedback button', async () => {
    // Arrange
    const exceptedPageTitle = 'Open feedback';

    // Act
    await statisticsPage.goto();
    await statisticsPage.openFeedbackButton.click();
    await statisticsPage.waitForPageToLoadUrl();
    const pageTitle = await statisticsPage.getTitle();

    // Assert
    expect(pageTitle, 'Link open feedback working').toContain(exceptedPageTitle);
  });
});
