import { randomUserCheckoutData } from '../factories/user-checkout.factory';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { OrderReceivedPage } from '../pages/order-received.page';
import { ShopPage } from '../pages/shop.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Verify shop', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });
  let shopPage: ShopPage;
  let productName: string;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    shopPage = new ShopPage(page);
    cartPage = new CartPage(page);
  });

  test('Add item to cart @GEN-S3-01', async ({}) => {
    // Arrange
    await shopPage.goto();
    productName = await shopPage.getRandomProductName();

    // Act
    await shopPage.addItemToCart(productName);
    await shopPage.clickMyCartButton();
    await cartPage.waitForPageToLoadUrl();

    // Assert
    const exceptedProductName = await shopPage.productName.textContent();

    expect(exceptedProductName?.replace(/[^A-Za-z]/g, '')).toContain(
      productName?.replace(/[^A-Za-z]/g, ''),
    );
  });

  test('Update product value @GEN-S3-02', async ({}) => {
    // Arrange
    const exceptedProductValue = '2';
    const exceptedCartUpdatedText = 'Cart updated.';
    // Act

    await cartPage.goto();
    await cartPage.increaseProductValue();

    // Assert
    await expect(cartPage.quantityValueLocator).toHaveValue(
      exceptedProductValue,
    );
    await expect(cartPage.cartUpdatedText).toHaveText(exceptedCartUpdatedText);
  });

  test('Make an order @GEN-S3-03', async ({ page }) => {
    // Arrange
    const orderPage = new OrderReceivedPage(page);
    const checkoutPage = new CheckoutPage(page);
    const randomUserFormData = randomUserCheckoutData();

    // Act
    await cartPage.goto();
    await cartPage.proceedToCheckoutButton.click({ delay: 200 });
    await checkoutPage.waitForPageToLoadUrl();
    await checkoutPage.fillOutTheForm(randomUserFormData);

    await checkoutPage.placeOrderButton.click({ timeout: 5000 });

    // Assert
    await expect(orderPage.orderReceivedText).toBeVisible();
  });
});
