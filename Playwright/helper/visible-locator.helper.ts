import {
  KeyValueObject,
  ArrayOfKeyValueObject,
} from "../model/interface.model";
import { expect, Page, Locator } from "@playwright/test";

export class IsVisible {
  constructor() {}
  async checkIfMultipleElementAreVisible(
    page: Page,
    obj: KeyValueObject | ArrayOfKeyValueObject
  ) {
    for (const prop in obj) {
      await page
        .getByTestId(prop)
        .all()
        .then((locators: Array<Locator>) => {
          locators.forEach(async (locator: Locator) => {
            await expect.soft(locator).toBeVisible({ timeout: 3000 });
          });
        });
    }
  }
  async checkIfLocatorsAreVisible(page: Page, obj) {
    for (const locator in obj) {
      const dataID = page.getByTestId(obj[locator]);
      const count = await dataID.count();
      for (let i = 0; i < count; i++) {
        await expect.soft(dataID.nth(i)).toBeVisible({ timeout: 3000 });
      }
    }
  }
}
