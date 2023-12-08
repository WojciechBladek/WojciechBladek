import { randomUserCheckoutDataModel } from '../factories/user-checkout.factory';
import { expect, test } from '../fixtures/merge.fixture';
import { CheckoutPage } from '../pages/checkout.page';
import { OrderReceivedPage } from '../pages/order-received.page';

test.describe('Verify shop', () => {
  let productName: string;

  test('Add item to cart @GEN-S3-01 @logged', async ({ shopPage, page }) => {
    // Arrange
    productName = await shopPage.getRandomProductName();

    // Act
    await shopPage.addItemToCart(productName);
    const cartPage = await shopPage.clickMyCartButton();
    await cartPage.waitForPageToLoadUrl();
    const logIt = await page.locator('[data-title="Product"]').textContent({});
    console.log(logIt);
    // Assert
    await expect(page.getByText(productName)).toBeVisible();
  });

  test('Update product value @GEN-S3-02 @logged', async ({ cartPage }) => {
    // Arrange
    const exceptedProductValue = '2';
    const exceptedCartUpdatedText = 'Cart updated.';

    // Act
    await cartPage.increaseProductValue();

    // Assert
    await expect(cartPage.quantityValueLocator).toHaveValue(
      exceptedProductValue,
    );
    await expect(cartPage.cartUpdatedText).toHaveText(exceptedCartUpdatedText);
  });

  test('Make an order @GEN-S3-03 @logged', async ({ page, cartPage }) => {
    // Arrange
    const orderPage = new OrderReceivedPage(page);
    const checkoutPage = new CheckoutPage(page);
    const randomUserFormData = randomUserCheckoutDataModel();

    // Act
    await cartPage.proceedToCheckoutButton.click({ delay: 200 });
    await checkoutPage.waitForPageToLoadUrl();
    await checkoutPage.fillOutTheForm(randomUserFormData);
    await checkoutPage.placeOrderButton.click({ delay: 2000 });

    if (await checkoutPage.errorMessage.isVisible()) {
      await checkoutPage.placeOrderButton.click({ delay: 2000 });
    }

    // Assert
    await expect(orderPage.orderReceivedText).toBeVisible();
  });
});
