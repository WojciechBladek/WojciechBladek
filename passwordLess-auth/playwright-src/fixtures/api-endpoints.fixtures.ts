import * as fs from 'fs';

export class APIEndpoints {
  baseURL = 'https://api-development.loop.elitecrew.io/api/v1/';

  story = this.baseURL + 'story';
  organisation = this.baseURL + 'organisation';
  country = this.baseURL + 'country';
  feedbackListInbox = this.baseURL + 'story/moderator/pending';

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
