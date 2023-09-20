import { Page } from '@playwright/test';

export class BasePage {
  url = '';
  constructor(protected page: Page) {}

  async goto(): Promise<void> {
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.goto(this.url, { waitUntil: 'networkidle' });
  }

  async title(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageToLoadUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }
}
