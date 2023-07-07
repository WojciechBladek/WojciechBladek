import { expect, Page, Locator } from "@playwright/test";

export class DistanceChecker {
  constructor() {}

  async getVerticalDistance(
    page: Page,
    el1: string | Locator,
    el2: string | Locator
  ) {
    const element1 = typeof el1 === "string" ? page.getByTestId(el1) : el1;
    const element2 = typeof el2 === "string" ? page.getByTestId(el2) : el2;

    const box1 = await element1?.boundingBox();
    const box2 = await element2?.boundingBox();

    return box1 && box2
      ? Math.round(box2.y) - Math.round(box1.y) - Math.round(box1.height)
      : null;
  }
  async getHorizontalDistance(
    page: Page,
    el1: string | Locator,
    el2: string | Locator
  ) {
    const element1 = typeof el1 === "string" ? page.getByTestId(el1) : el1;
    const element2 = typeof el2 === "string" ? page.getByTestId(el2) : el2;

    const box1 = await element1?.boundingBox();
    const box2 = await element2?.boundingBox();

    return box1 && box2 ? box2.x - (box1.x + box1.width) : null;
  }
  async checkdistanceIfPaddingOrMargin(
    page: Page,
    distanceLocator: number | null | undefined | Locator,
    distanceValue: number,
    paddingLocator: string | Locator,
    paddingCategory: string,
    paddingValue: string
  ) {
    const locator1 =
      typeof distanceLocator === "string"
        ? page.getByTestId(distanceLocator)
        : distanceLocator;
    const locator2 =
      typeof paddingLocator === "string"
        ? page.getByTestId(paddingLocator)
        : paddingLocator;
    locator1
      ? expect
          .soft(locator1, `'${locator1}' should eq '${distanceValue}'`)
          .toEqual(distanceValue)
      : await expect
          .soft(
            locator2,
            `'${locator2}' should have '${paddingCategory}' = '${paddingValue}'`
          )
          .toHaveCSS(paddingCategory, paddingValue);
  }

  async getVerticalDistanceForMultipleItems(
    page: Page,
    count: number,
    locator1: string | Locator,
    locator2: string | Locator
  ) {
    for (let i = 0; i < count; i++) {
      const element1 =
        typeof locator1 === "string"
          ? page.getByTestId(locator1).nth(i)
          : locator1;
      const element2 =
        typeof locator2 === "string"
          ? page.getByTestId(locator2).nth(i)
          : locator2;
      const result = await this.getVerticalDistance(page, element1, element2);
      return result;
    }
  }
  async ifTextIsLastOrImgIsLatCheckDistance(
    el1: number | null,
    el2: number | null,
    exceptedDistance: number
  ) {
    const locator1 = el1;
    const locator2 = el2;
    locator1
      ? expect.soft(locator1).toEqual(exceptedDistance)
      : expect.soft(locator2).toEqual(exceptedDistance);
  }

  async checkIsWithinTolerance(
    actual: number | null,
    expected: number,
    tolerance: number
  ) {
    if (!expected) {
      return null;
    } else {
      // @ts-ignore
      return actual >= expected - tolerance && actual <= expected + tolerance;
    }
  }

  async checkVerticalDistanceBetweenLocators(
    page: Page,
    locator1: Locator | string,
    locator2: Locator | string,
    exceptedDistanceValue: number
  ) {
    const locatorID1 =
      typeof locator1 === "string" ? page.getByTestId(locator1) : locator1;
    const locatorID2 =
      typeof locator2 === "string" ? page.getByTestId(locator2) : locator2;
    const currentDistanceValue = await this.getVerticalDistance(
      page,
      locatorID1,
      locatorID2
    );
    expect
      .soft(
        currentDistanceValue,
        `'${locator1}' distance between '${locator2}' should eq '${exceptedDistanceValue}px' `
      )
      .toEqual(exceptedDistanceValue);
  }
  async checkHorizontalDistanceBetweenLocators(
    page: Page,
    locator1: Locator | string,
    locator2: Locator | string,
    exceptedDistanceValue: number
  ) {
    const locatorID1 =
      typeof locator1 === "string" ? page.getByTestId(locator1) : locator1;
    const locatorID2 =
      typeof locator2 === "string" ? page.getByTestId(locator2) : locator2;
    const currentDistanceValue = await this.getHorizontalDistance(
      page,
      locatorID1,
      locatorID2
    );
    expect
      .soft(
        currentDistanceValue,
        `'${locator1}' distance between '${locator2}' should eq '${exceptedDistanceValue}px' `
      )
      .toEqual(exceptedDistanceValue);
  }
}
