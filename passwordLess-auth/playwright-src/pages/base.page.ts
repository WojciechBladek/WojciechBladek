import { Page } from 'playwright';

export class BasePage {
  url = '';

  constructor(protected page: Page) {}

  async goto(): Promise<void> {
    // eslint-disable-next-line playwright/no-networkidle
    await this.page.goto(this.url, { waitUntil: 'networkidle' });
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageToLoadUrl(optionalUrl?: string): Promise<void> {
    if (optionalUrl) {
      await this.page.waitForURL(optionalUrl);
    } else {
      await this.page.waitForURL(this.url);
    }
  }
}
