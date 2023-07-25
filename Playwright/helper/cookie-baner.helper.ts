import { Page } from "@playwright/test";

//TODO: add locator
const cookieButtonLocator = "locator";
const cookieButton = (page: Page) => {
  return page.locator(cookieButtonLocator);
};

const clickCookieBaner = async (page: Page) => {
  try {
    const cookieButtonFound = await page
      .waitForSelector(cookieButtonLocator, { timeout: 3000 })
      .catch(() => {
        console.log("coookie banner not found");
      });

    if (cookieButtonFound) {
      await cookieButton(page).click();
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const cookieData = {
  clickCookieBaner,
};
