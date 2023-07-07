import { KeyValueObject, BoundingBox } from "../model/interface.model";
import { expect, Page, Locator } from "@playwright/test";

export class StyleChecker {
  constructor() {}

  async css(page: Page, locator: string | Locator, obj: KeyValueObject) {
    const locatorID =
      typeof locator === "string" ? page.getByTestId(locator) : locator;
    for (const prop in obj) {
      await expect
        .soft(
          locatorID,
          `'${prop}' should be '${obj[prop]}' it occurs for '${locator}' locator`
        )
        .toHaveCSS(prop, obj[prop]);
    }
  }

  async cssSomeLocators(
    page: Page,
    locator: string | Locator,
    typography: KeyValueObject
  ) {
    const locatorID =
      typeof locator === "string" ? page.getByTestId(locator) : locator;
    const count = await locatorID.count();
    for (let i = 0; i < count; i++) {
      await this.css(page, locatorID.nth(i), typography);
    }
  }

  async cssSomeLocatorsWithAtribute(
    page: Page,
    locator: string | Locator,
    atr: string,
    typography: KeyValueObject
  ) {
    const locatorID =
      typeof locator === "string"
        ? await page.getByTestId(locator).locator(`> ${atr}`)
        : locator;
    const count = await locatorID.count();
    for (let i = 0; i < count; i++) {
      await this.css(page, locatorID.nth(i), typography);
    }
  }

  async property(locator: BoundingBox | null, obj: KeyValueObject | any) {
    for (const prop in obj) {
      expect
        .soft(
          locator,
          `'${prop}' should eql '${obj[prop]}' for locator '${locator}'`
        )
        .toHaveProperty(prop, obj[prop]);
    }
  }

  async propertyTolerance(
    actual: object | Array<number>,
    expected: Record<string, number>,
    tolerance: number
  ) {
    return Object.entries(expected).every(([, expectedValue], i) => {
      return (
        actual[i] >= expectedValue - tolerance &&
        actual[i] <= expectedValue + tolerance
      );
    });
  }
}
