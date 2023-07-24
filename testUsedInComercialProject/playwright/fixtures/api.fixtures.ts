import { Page } from "@playwright/test";
import Imap from "imap";
import { APIRequestContext } from "playwright-core";
import { LoginPage } from "../pages/login.pages";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

export class Api {
  //remember to use at least the path parameter to access the token
  constructor(private path?: string, private userRole?: string) {}

  url = "********************";

  endpoints = {
    userMe: "api/v1/user/me",
    subscriptionRequest: "api/v1/subscription/request",
    recordCsvActivity: "api/v1/export/user-csv-activity",
  };

  loggedHeaders = {
    Authorization: `Bearer ${this.getAccessToken()}`,
  };
  resultPromise(page, endpoint) {
    return page.waitForResponse(`${this.url}${endpoint}`);
  }

  requestPromise(page, endpoint) {
    return page.waitForRequest(`${this.url}${endpoint}`);
  }

  async requestGet(
    request: APIRequestContext,
    endpoint: string,
    header: { [key: string]: string }
  ) {
    const sendRequest = await request.get(`${this.url}${endpoint}`, {
      headers: header,
    });
    const response = await sendRequest.json();
    return response;
  }

  async checkIfTokenIsActive(
    page: Page,
    request: APIRequestContext,
    config: Imap.Config
  ) {
    const checkToken = await request.get(
      `${this.url}${this.endpoints.userMe}`,
      { headers: this.loggedHeaders }
    );

    if (await checkToken.ok()) {
      true;
    } else {
      console.log("Use logic for refresh token");
      await LoginPage.authenticateToApp(
        page,
        this.userRole!,
        this.path!,
        config
      );
    }
    const result = await checkToken.json();
    return result;
  }

  getAccessToken() {
    if (this.loginDataFile()) {
      const data = this.loginDataFile();
      const token = data.origins.map((el) => el.localStorage);

      for (const item of token.flat()) {
        if (item.name.includes("accessToken")) {
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
