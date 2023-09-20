import { BasePage } from './base.page';
import { Page } from '@playwright/test';

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
    await this.incrementProductValue.click();
    await this.updateCartButton.click();
  }
}
