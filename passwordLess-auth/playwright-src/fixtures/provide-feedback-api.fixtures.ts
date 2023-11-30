import { APIResponse } from '@playwright/test';
import { prepareRandomFeedbackData } from '@_playwright-src/factories/provide-feedback.factory';
import { BaseAPI } from '@_playwright-src/fixtures/base-api.fixtures';
import { getRandomNumber } from '@_playwright-src/helpers/randomValue.helper';
import { APIRequestContext } from 'playwright-core';

export interface FeedbackData {
  response: APIResponse;
  content: string;
}
export interface CreateAndEditFeedback {
  storyID: APIResponse;
  content: string;
}

export class ProvideFeedbackFixture extends BaseAPI {
  feedbackContent = prepareRandomFeedbackData();

  constructor(private request: APIRequestContext) {
    super();
  }

  async createFeedbackViaApi(): Promise<FeedbackData> {
    const response = await this.request.post(this.storyEndpoint, {
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
    const response = await this.request.get(this.organisationEndpoint);
    const body = await response.json();
    return body[0].id;
  }

  async getCountryList(): Promise<APIResponse> {
    const response = await this.request.get(this.countryEndpoint);
    const body = await response.json();
    const randomCountry = getRandomNumber(body.length);
    return body[randomCountry].id;
  }

  async getFeedbackID(): Promise<APIResponse> {
    const response = await this.request.get(this.feedbackListInboxEndpoint, {
      params: {
        page: '1',
        limit: '5',
        order: 'desc',
      },
      headers: {
        Authorization: `Bearer ${this.getAccessToken(this.baseAuthPath)}`,
      },
    });
    const body = await response.json();
    return body.items[0].id;
  }

  async updateFeedbackBeforePublish(storyID: APIResponse): Promise<void> {
    await this.request.put(this.updateFeedbackEndpoint(storyID), {
      data: {
        authorNickname: `${this.feedbackContent.name}`,
        age: 0,
        gender: 0,
        categories: [1],
        difficulties: [],
        maternityStatus: [],
        thematics: [75],
        organisations: [`${await this.getOrganizationList()}`],
        countryId: `${await this.getCountryList()}`,
        isSensitive: false,
        language: 'en',
        translations: [],
      },
      headers: {
        Authorization: `Bearer ${this.getAccessToken(this.baseAuthPath)}`,
      },
    });
  }

  async publishFeedback(storyID: APIResponse): Promise<void> {
    await this.request.put(this.publishFeedbackEndpoint(storyID), {
      headers: {
        Authorization: `Bearer ${this.getAccessToken(this.baseAuthPath)}`,
      },
    });
  }

  async getWebFeedbackDetails(storyID: APIResponse): Promise<APIResponse> {
    const response = await this.request.get(this.webFeedbackDetailsEndpoint(storyID), {
      headers: {
        Authorization: `Bearer ${this.getAccessToken(this.baseAuthPath)}`,
      },
    });
    return response.json();
  }

  async createAndPublishFeedback(): Promise<APIResponse> {
    await this.createFeedbackViaApi();
    const storyID = await this.getFeedbackID();
    await this.updateFeedbackBeforePublish(storyID);
    await this.publishFeedback(storyID);
    return storyID;
  }

  async createAndEditFeedback(): Promise<CreateAndEditFeedback> {
    const feedback = await this.createFeedbackViaApi();
    const storyID = await this.getFeedbackID();
    await this.updateFeedbackBeforePublish(storyID);

    return {
      storyID: storyID,
      content: feedback.content,
    };
  }
}
