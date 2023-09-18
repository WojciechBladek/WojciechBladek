import { ShopPage } from '../pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify shop', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });
  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
  });

  test('Add item to cart @GEN-S3-01', async ({}) => {
    // Arrange
    await shopPage.goto();
    const productName = await shopPage.getRandomProductName();

    // Act
    await shopPage.addItemToCart(productName);
    await shopPage.myCartButton.click();

    // Assert
    const exceptedProductText = await shopPage.productName(productName);
    expect(exceptedProductText).toContain(productName);
  });
});
