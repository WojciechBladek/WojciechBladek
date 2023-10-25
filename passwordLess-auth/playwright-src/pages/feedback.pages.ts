import { Page } from '@playwright/test';
import { BasePage } from '@_playwright-src/pages/base.page';

export class FeedbackPage extends BasePage {
  url = '/feedback';

  constructor(page: Page) {
    super(page);
  }
}
