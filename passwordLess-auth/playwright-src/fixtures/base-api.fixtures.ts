import { adminPath } from '@_playwright-src/test-data/user.data';
import { APIResponse } from '@playwright/test';
import * as fs from 'fs';

export class BaseAPI {
  baseURL = '**/api/v1/';
  baseAuthPath = adminPath

  storyEndpoint = this.baseURL + 'story';
  organisationEndpoint = this.baseURL + 'organisation';
  countryEndpoint = this.baseURL + 'country';
  feedbackListInboxEndpoint = this.baseURL + 'story/moderator/pending';

  unpublishFeedbackEndpoint(storyID: APIResponse): string {
    return this.baseURL + `story/moderator/${storyID}/reject`;
  }

  editFeedbackEndpoint(storyID: APIResponse): string {
    return this.baseURL + `story/moderator/${storyID}/unpublish`;
  }

  updateFeedbackEndpoint(storyID: APIResponse): string {
    return this.baseURL + `story/moderator/${storyID}`;
  }

  publishFeedbackEndpoint(storyID: APIResponse): string {
    return this.baseURL + `story/moderator/${storyID}/publish`;
  }

  webFeedbackDetailsEndpoint(webStoryID: APIResponse): string {
    return this.baseURL + `story/moderator/web/${webStoryID}`;
  }

  getAccessToken(path: string) {
    if (this.loginDataFile(path)) {
      const data = this.loginDataFile(path);
      const token = data.origins.map((el: any) => el.localStorage);

      for (const item of token.flat()) {
        if (item.name.includes('accessToken')) {
          const accessToken = item.value;
          return accessToken;
        }
      }
    }
  }

  loginDataFile(path: string) {
    try {
      const rawData = fs.readFileSync(path, 'utf8');
      if (rawData) {
        const data = JSON.parse(rawData);
        return data;
      }
    } catch (error) {
      `File ${path} doesn't exists`;
    }
  }
}
