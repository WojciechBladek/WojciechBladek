import { Page } from '@playwright/test';
import Imap from 'imap';
import { envData } from 'mailBox';
import { APIRequestContext } from 'playwright-core';
import { LoginPage } from 'playwright/pages/login.pages';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export class Api {
  // parameter path is required to get authorization token
  // parameter userRole is used to authenticate when token lost validation
  constructor(
    private path?: string,
    private userRole?: string,
  ) {}

  url = 'urlComercialProject';

  endpoints = {
    userMe: 'api/v1/user/me',
    subscriptionRequest: 'api/v1/subscription/request',
    recordCsvActivity: 'api/v1/export/user-csv-activity',
    createNewOrganisation: 'api/v1/organisation',
    generateSubscriptionToken: 'api/v1/subscription/generate-token',
    exportCsv: 'api/v1/export/csv',
  };

  loggedHeaders = {
    envAuthToken: {
      Authorization: envData.basicToken,
    },
    authBearerToken: {
      Authorization: `Bearer ${this.getAccessToken()}`,
    },
  };

  resultPromise(page, endpoint) {
    return page.waitForResponse(`${this.url}${endpoint}`);
  }

  requestPromise(page, endpoint) {
    return page.waitForRequest(`${this.url}${endpoint}`);
  }

  async requestGet(request: APIRequestContext, endpoint: string, header?: { [key: string]: string }) {
    const sendRequest = await request.get(`${this.url}${endpoint}`, { headers: header });
    const response = await sendRequest.json();
    return response;
  }

  async requestPost(request: APIRequestContext, endpoint: string, header: { [key: string]: string }, body: object) {
    return await request.post(`${this.url}${endpoint}`, {
      data: body,
      headers: header,
    });
  }

  async checkIfTokenIsActive(page: Page, request: APIRequestContext, config: Imap.Config) {
    const checkToken = await request.get(`${this.url}${this.endpoints.userMe}`, { headers: this.loggedHeaders.authBearerToken });

    if (await checkToken.ok()) {
      true;
    } else {
      console.log('Use logic for refresh token');
      await LoginPage.authenticateToApp(page, this.userRole, this.path, config);
    }
    const result = await checkToken.json();
    return result;
  }

  getAccessToken() {
    if (this.loginDataFile()) {
      const data = this.loginDataFile();
      const token = data.origins.map((el) => el.localStorage);

      for (const item of token.flat()) {
        if (item.name.includes('accessToken')) {
          const accessToken = item.value;
          return accessToken;
        }
      }
    }
  }

  loginDataFile() {
    try {
      const rawData = fs.readFileSync(this.path);
      if (rawData) {
        const data = JSON.parse(rawData);
        return data;
      }
    } catch (error) {}
  }
}
