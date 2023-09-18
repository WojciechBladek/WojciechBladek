import { CartPage } from '../pages/cart.page';
import { ShopPage } from '../pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify shop', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });
  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
  });

  test('Add item to cart @GEN-S3-01', async ({ page }) => {
    // Arrange
    const cartPage = new CartPage(page);
    await shopPage.goto();
    const productName = await shopPage.getRandomProductName();

    // Act
    await shopPage.addItemToCart(productName);
    await shopPage.myCartButton.click();
    await cartPage.waitForPageToLoadUrl();

    // Assert
    await expect(
      await shopPage.productNameLocator(productName),
      'Product should be visible in cart',
    ).toBeVisible();
  });
});
