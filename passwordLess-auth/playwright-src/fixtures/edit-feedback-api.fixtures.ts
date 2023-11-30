import { APIResponse, Page } from '@playwright/test';
import { prepareRandomFeedbackData } from '@_playwright-src/factories/provide-feedback.factory';
import { BaseAPI } from '@_playwright-src/fixtures/base-api.fixtures';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';
import { APIRequestContext } from 'playwright-core';

export class EditFeedbackFixture extends BaseAPI {
  feedbackContent = prepareRandomFeedbackData();

  constructor(private request: APIRequestContext, private page: Page) {
    super();
  }

  async setFeedbackStatusEdited(storyID: APIResponse): Promise<InboxPage> {
    await this.request.put(this.editFeedbackEndpoint(storyID), {
      headers: {
        Authorization: `Bearer ${this.getAccessToken(this.baseAuthPath)}`,
      },
    });
    return new InboxPage(this.page);
  }
}
