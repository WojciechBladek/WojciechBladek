/* eslint-disable playwright/no-conditional-in-test */
import { checkIsWithinTolerance } from '@_playwright-main/helpers/checkIsWithinTolerance';
import { expect, test } from '@playwright/test';

test('Testing slider', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/#/');

  const maxValue = 200;
  const expectedValue = 152;
  const targetValue = expectedValue / maxValue;
  // console.log(targetValue);

  const realSlider = page.locator('.ngx-slider-span.ngx-slider-bar').nth(1);
  const realSliderBoundingBox = await realSlider.boundingBox();
  // console.log('Slider width', realSliderBoundingBox!.width);

  const pointer = page.locator(
    '.ngx-slider-span.ngx-slider-pointer.ngx-slider-pointer-min',
  );
  const pointer2 = page.getByRole('slider', { name: 'ngx-slider-max' });
  const pointerWidth = await pointer.boundingBox().then((el) => el!.width);

  // console.log('Pointer width', pointerWidth);
  // console.log(
  //   'Slider width without pointer (pointer thickness should be counted)',
  //   Math.floor(realSliderBoundingBox!.width - pointerWidth),
  // );

  // pointer/2 need to be added to compute that element starts from its middle
  const pixelsToMove =
    Math.floor((realSliderBoundingBox!.width - pointerWidth) * targetValue) +
    pointerWidth / 2;

  // console.log('Pixels to move', pixelsToMove);

  await pointer.dragTo(pointer, {
    force: true,
    targetPosition: {
      x: pixelsToMove,
      y: 0,
    },
  });

  const displayedRangeBelow100 = parseInt(
    await pointer.getAttribute('aria-valuetext'),
  );
  const displayedRangeAbove100 = parseInt(
    await pointer2.getAttribute('aria-valuetext'),
  );

  if (displayedRangeBelow100 < 100) {
    expect(
      checkIsWithinTolerance(displayedRangeBelow100, expectedValue, 2),
    ).toBeTruthy();
  } else {
    expect(
      checkIsWithinTolerance(displayedRangeAbove100, expectedValue, 2),
    ).toBeTruthy();
  }
});
