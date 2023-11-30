import { APIResponse } from '@playwright/test';
import { prepareRandomFeedbackData } from '@_playwright-src/factories/provide-feedback.factory';
import { BaseAPI } from '@_playwright-src/fixtures/base-api.fixtures';
import { APIRequestContext } from 'playwright-core';

export class FeedbackFixture extends BaseAPI {
  feedbackContent = prepareRandomFeedbackData();

  constructor(private request: APIRequestContext) {
    super();
  }

  async getWebFeedbackDetails(storyID: APIResponse): Promise<APIResponse> {
    const response = await this.request.get(this.webFeedbackDetailsEndpoint(storyID), {
      headers: {
        Authorization: `Bearer ${this.getAccessToken(this.baseAuthPath)}`,
      },
    });
    return response;
  }

  async unpublishFeedback(storyID: APIResponse): Promise<void> {
    await this.request.put(this.unpublishFeedbackEndpoint(storyID), {
      data: {
        reasonIds: [1],
        reasonTexts: ['Regression test'],
        rationale: '',
        notificationLanguage: 'en',
      },
      headers: {
        Authorization: `Bearer ${this.getAccessToken(this.baseAuthPath)}`,
      },
    });
  }
}
