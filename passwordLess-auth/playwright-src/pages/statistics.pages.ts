import { Page } from '@playwright/test';
import { BasePage } from '@_playwright-src/pages/base.page';

export class StatisticsPage extends BasePage {
  url = '/statistics/open-stories';
  openFeedbackButton = this.page.getByRole('link', { name: 'Open feedback' });
  sensitiveCasesButton = this.page.getByRole('link', { name: 'Sensitive cases' });

  constructor(page: Page) {
    super(page);
  }

  async clickOpenFeedbackButton(): Promise<StatisticsPage> {
    await this.openFeedbackButton.click();
    return new StatisticsPage(this.page);
  }

  async clickSensitiveCasesButton(): Promise<StatisticsPage> {
    await this.sensitiveCasesButton.click();
    return new StatisticsPage(this.page);
  }
}
