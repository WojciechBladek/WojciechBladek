/* eslint-disable */
import { BoundingBox, KeyValueObject } from '../model/interface.model';
import { Locator, Page, expect } from '@playwright/test';

const css = async (
  page: Page,
  locator: string | Locator,
  obj: KeyValueObject,
) => {
  const locatorID =
    typeof locator === 'string' ? page.getByTestId(locator) : locator;
  for (const prop in obj) {
    await expect
      .soft(
        locatorID,
        `'${prop}' should be '${obj[prop]}' it occurs for '${locator}' locator`,
      )
      .toHaveCSS(prop, obj[prop]);
  }
};

const cssSomeLocators = async (
  page: Page,
  locator: string | Locator,
  typography: KeyValueObject,
) => {
  const locatorID =
    typeof locator === 'string' ? page.getByTestId(locator) : locator;
  const count = await locatorID.count();
  for (let i = 0; i < count; i++) {
    await css(page, locatorID.nth(i), typography);
  }
};

const cssSomeLocatorsWithAtribute = async (
  page: Page,
  locator: string | Locator,
  atr: string,
  typography: KeyValueObject,
) => {
  const locatorID =
    typeof locator === 'string'
      ? page.getByTestId(locator).locator(`> ${atr}`)
      : locator;
  const count = await locatorID.count();
  for (let i = 0; i < count; i++) {
    await css(page, locatorID.nth(i), typography);
  }
};

const property = async (
  locator: BoundingBox | null,
  obj: KeyValueObject | any,
) => {
  for (const prop in obj) {
    expect
      .soft(
        locator,
        `'${prop}' should eql '${obj[prop]}' for locator '${locator}'`,
      )
      .toHaveProperty(prop, obj[prop]);
  }
};

const propertyTolerance = async (
  actual: object | Array<number>,
  expected: Record<string, number>,
  tolerance: number,
) => {
  return Object.entries(expected).every(([, expectedValue], i) => {
    return (
      actual[i] >= expectedValue - tolerance &&
      actual[i] <= expectedValue + tolerance
    );
  });
};

export const styleChecker = {
  css,
  cssSomeLocators,
  cssSomeLocatorsWithAtribute,
  property,
  propertyTolerance,
};
