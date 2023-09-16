/* eslint-disable */
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ShopPage extends BasePage {
  url = '/shop';

  myCartButton = this.page.getByRole('listitem').filter({ hasText: 'My Cart' });

  constructor(page: Page) {
    super(page);
  }

  async addItemToCart(productName: string): Promise<void> {
    await this.page
      .getByRole('listitem')
      .filter({ hasText: `${productName}` })
      .getByRole('link', { name: ' Add to cart' })
      .click();
  }

  async productName(productName: string): Promise<string | null> {
    return await this.page
      .getByRole('link', { name: `${productName}` })
      .textContent();
  }
}
