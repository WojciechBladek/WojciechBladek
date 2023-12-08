import { randomUserCheckoutDataModel } from '../factories/user-checkout.factory';
import { expect, test } from '../fixtures/merge.fixture';

test.describe.configure({ mode: 'serial' });
test.describe('Verify shop', () => {
  let productName: string;

  test('Add item to cart @GEN-S3-01 @logged', async ({ shopPage }) => {
    // Arrange
    productName = await shopPage.getRandomProductName();

    // Act
    await shopPage.addItemToCart(productName);
    const cartPage = await shopPage.clickMyCartButton();
    await cartPage.waitForPageToLoadUrl();

    // Assert
    await expect(cartPage.productLocator(productName)).toBeVisible();
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

  test('Make an order @GEN-S3-03 @logged', async ({ cartPage }) => {
    // Arrange
    const randomUserFormData = randomUserCheckoutDataModel();

    // Act
    const checkoutPage = await cartPage.clickButtonProceedToCheckout();
    await checkoutPage.waitForPageToLoadUrl();
    await checkoutPage.fillOutTheForm(randomUserFormData);
    const orderPage = await checkoutPage.clickPlaceOrderButton();

    if (await checkoutPage.errorMessage.isVisible()) {
      await checkoutPage.placeOrderButton.click({ delay: 2000 });
    }

    // Assert
    await expect(orderPage.orderReceivedText).toBeVisible();
  });
});
