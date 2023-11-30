/* eslint-disable playwright/no-networkidle */
import { Locator } from '@playwright/test';
import { Page } from 'playwright';

export class BasePage {
  url = '';

  constructor(protected page: Page) {}

  async goto(): Promise<void> {
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

  async waitForLoadLocator(locator: Locator): Promise<void> {
    await locator.waitFor();
  }
}
