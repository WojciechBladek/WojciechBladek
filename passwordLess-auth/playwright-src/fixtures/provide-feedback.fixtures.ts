import { APIResponse } from '@playwright/test';
import { prepareRandomFeedbackData } from '@_playwright-src/factories/provide-feedback.factory';
import { APIRequestContext } from 'playwright-core';
import { APIEndpoints } from '@_playwright-src/fixtures/api-endpoints.fixtures';

export interface FeedbackData {
  response: APIResponse;
  content: string;
}

interface FeedbackData {
  response: APIResponse;
  content: string;
}

export class ProvideFeedbackFixture {
  apiEndpoints = new APIEndpoints();
  feedbackContent = prepareRandomFeedbackData();

  constructor(private request: APIRequestContext) {}

  async createFeedbackViaApi(): Promise<FeedbackData> {
    const response = await this.request.post(this.apiEndpoints.story, {
      data: {
        content: `${this.feedbackContent.body}`,
        categories: [1],
        countryId: `${await this.getCountryList()}`,
        organisations: [`${await this.getOrganizationList()}`],
        authorNickname: `${this.feedbackContent.name}`,
        email: `${this.feedbackContent.email}`,
      },
    });
    return {
      response: response,
      content: this.feedbackContent.body,
    };
  }

  async getOrganizationList(): Promise<APIResponse> {
    const response = await this.request.get(this.apiEndpoints.organisation);
    const body = await response.json();
    return body[0].id;
  }

  async getCountryList(): Promise<APIResponse> {
    const response = await this.request.get(this.apiEndpoints.country);
    const body = await response.json();
    return body[0].id;
  }

  async getFeedbackListFromInbox(path: string): Promise<APIResponse> {
    const response = await this.request.get(this.apiEndpoints.feedbackListInbox, {
      params: {
        page: '1',
        limit: '15',
        order: 'desc',
      },
      headers: {
        Authorization: `Bearer ${this.apiEndpoints.getAccessToken(path)}`,
      },
    });
    const body = await response.json();
    return body.items[0].id;
  }
}
