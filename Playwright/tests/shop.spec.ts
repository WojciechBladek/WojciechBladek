import { ShopPage } from '../pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe('Verify shop', () => {
  test.use({ storageState: 'playwright//.auth/user.json' });
  let shopPage: ShopPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
  });

  test.fixme('Add item to cart @GEN_S3_01', async ({ }) => {
    //TODO: add products lists
    // Arrange
    const productName = 'Amari Shirt';
    await shopPage.goto();

    // Act
    await shopPage.addItemToCart(productName);
    await shopPage.myCartButton.click();

    // Assert
    const exceptedProductText = await shopPage.productName(productName);
    expect(exceptedProductText).toContain(productName);
  });
});
