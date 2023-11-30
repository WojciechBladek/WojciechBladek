import { Page } from '@playwright/test';
import { BasePage } from '@_playwright-src/pages/base.page';

export class OutboxPage extends BasePage {
  url = '/outbox/pending-recording';

  pendingRecordingButton = this.page.getByRole('link', { name: 'Pending recording' });
  inProgressButton = this.page.getByRole('link', { name: 'In progress' });
  archiveDisabledButton = this.page.locator('li').filter({ hasText: 'Archive' });

  constructor(page: Page) {
    super(page);
  }

  async clickPendingRecordingButton(): Promise<OutboxPage>{
    await this.pendingRecordingButton.click()
    return new OutboxPage(this.page)
  }
}
