/* eslint-disable */
import { Locator, Page, expect } from '@playwright/test';

const getVerticalDistance = async (
  page: Page,
  el1: string | Locator,
  el2: string | Locator,
) => {
  const element1 = typeof el1 === 'string' ? page.getByTestId(el1) : el1;
  const element2 = typeof el2 === 'string' ? page.getByTestId(el2) : el2;

  const box1 = await element1?.boundingBox();
  const box2 = await element2?.boundingBox();

  return box1 && box2
    ? Math.round(box2.y) - Math.round(box1.y) - Math.round(box1.height)
    : null;
};
const getHorizontalDistance = async (
  page: Page,
  el1: string | Locator,
  el2: string | Locator,
) => {
  const element1 = typeof el1 === 'string' ? page.getByTestId(el1) : el1;
  const element2 = typeof el2 === 'string' ? page.getByTestId(el2) : el2;

  const box1 = await element1?.boundingBox();
  const box2 = await element2?.boundingBox();

  return box1 && box2 ? box2.x - (box1.x + box1.width) : null;
};
const checkdistanceIfPaddingOrMargin = async (
  page: Page,
  distanceLocator: number | null | undefined | Locator,
  distanceValue: number,
  paddingLocator: string | Locator,
  paddingCategory: string,
  paddingValue: string,
) => {
  const locator1 =
    typeof distanceLocator === 'string'
      ? page.getByTestId(distanceLocator)
      : distanceLocator;
  const locator2 =
    typeof paddingLocator === 'string'
      ? page.getByTestId(paddingLocator)
      : paddingLocator;
  locator1
    ? expect
        .soft(locator1, `'${locator1}' should eq '${distanceValue}'`)
        .toEqual(distanceValue)
    : await expect
        .soft(
          locator2,
          `'${locator2}' should have '${paddingCategory}' = '${paddingValue}'`,
        )
        .toHaveCSS(paddingCategory, paddingValue);
};

const getVerticalDistanceForMultipleItems = async (
  page: Page,
  count: number,
  locator1: string | Locator,
  locator2: string | Locator,
) => {
  for (let i = 0; i < count; i++) {
    const element1 =
      typeof locator1 === 'string'
        ? page.getByTestId(locator1).nth(i)
        : locator1;
    const element2 =
      typeof locator2 === 'string'
        ? page.getByTestId(locator2).nth(i)
        : locator2;
    const result = await getVerticalDistance(page, element1, element2);
    return result;
  }
};
const ifTextIsLastOrImgIsLatCheckDistance = async (
  el1: number | null,
  el2: number | null,
  exceptedDistance: number,
) => {
  const locator1 = el1;
  const locator2 = el2;
  locator1
    ? expect.soft(locator1).toEqual(exceptedDistance)
    : expect.soft(locator2).toEqual(exceptedDistance);
};

const checkIsWithinTolerance = async (
  actual: number | null,
  expected: number,
  tolerance: number,
) => {
  if (!expected) {
    return null;
  } else {
    // @ts-ignore
    return actual >= expected - tolerance && actual <= expected + tolerance;
  }
};

const checkVerticalDistanceBetweenLocators = async (
  page: Page,
  locator1: Locator | string,
  locator2: Locator | string,
  exceptedDistanceValue: number,
) => {
  const locatorID1 =
    typeof locator1 === 'string' ? page.getByTestId(locator1) : locator1;
  const locatorID2 =
    typeof locator2 === 'string' ? page.getByTestId(locator2) : locator2;
  const currentDistanceValue = await getVerticalDistance(
    page,
    locatorID1,
    locatorID2,
  );
  expect
    .soft(
      currentDistanceValue,
      `'${locator1}' distance between '${locator2}' should eq '${exceptedDistanceValue}px' `,
    )
    .toEqual(exceptedDistanceValue);
};
const checkHorizontalDistanceBetweenLocators = async (
  page: Page,
  locator1: Locator | string,
  locator2: Locator | string,
  exceptedDistanceValue: number,
) => {
  const locatorID1 =
    typeof locator1 === 'string' ? page.getByTestId(locator1) : locator1;
  const locatorID2 =
    typeof locator2 === 'string' ? page.getByTestId(locator2) : locator2;
  const currentDistanceValue = await getHorizontalDistance(
    page,
    locatorID1,
    locatorID2,
  );
  expect
    .soft(
      currentDistanceValue,
      `'${locator1}' distance between '${locator2}' should eq '${exceptedDistanceValue}px' `,
    )
    .toEqual(exceptedDistanceValue);
};

export const distanceChecker = {
  getVerticalDistance,
  getHorizontalDistance,
  checkdistanceIfPaddingOrMargin,
  getVerticalDistanceForMultipleItems,
  ifTextIsLastOrImgIsLatCheckDistance,
  checkIsWithinTolerance,
  checkVerticalDistanceBetweenLocators,
  checkHorizontalDistanceBetweenLocators,
};
