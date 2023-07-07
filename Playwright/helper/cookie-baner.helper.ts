import { test, expect, Page, Locator } from "@playwright/test";

export class CookieData {
  constructor() {}
  //TODO: add locator
  cookieButtonLocator = "locator";
  cookieButton(page: Page) {
    return page.locator(this.cookieButtonLocator);
  }

  async clickCookieBaner(page: Page) {
    try {
      const cookieButtonFound = await page
        .waitForSelector(this.cookieButtonLocator, { timeout: 3000 })
        .catch(() => {
          console.log("coookie banner not found");
        });

      if (cookieButtonFound) {
        await this.cookieButton(page).click();
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}
