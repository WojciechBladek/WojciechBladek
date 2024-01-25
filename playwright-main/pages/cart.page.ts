import { BasePage } from '@_playwright-main/pages/base.page';
import { CheckoutPage } from '@_playwright-main/pages/checkout.page';
import { Locator, Page } from '@playwright/test';

export class CartPage extends BasePage {
  url = '/cart/';

  incrementProductValue = this.page.getByRole('link', { name: '' });
  updateCartButton = this.page.getByRole('button', { name: 'Update cart' });
  quantityValueLocator = this.page.getByLabel('Quantity');

  cartUpdatedText = this.page.getByText('Cart updated.');
  proceedToCheckoutButton = this.page.getByRole('link', {
    name: 'Proceed to checkout',
  });
  cartIsEmpty = this.page.getByText('Your cart is currently empty.');

  constructor(page: Page) {
    super(page);
  }

  async increaseProductValue(): Promise<void> {
    await this.incrementProductValue.first().click();
    await this.updateCartButton.click();
  }

  productLocator(productName: string): Locator {
    return this.page.getByText(productName);
  }

  async clickButtonProceedToCheckout(): Promise<CheckoutPage> {
    await this.proceedToCheckoutButton.click({ delay: 200 });
    return new CheckoutPage(this.page);
  }
}
