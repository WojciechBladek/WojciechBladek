/* eslint-disable */
import { getRandomValue } from '../helpers/randomValue.helper';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ShopPage extends BasePage {
  url = '/shop';

  myCartButton = this.page.getByRole('listitem').filter({ hasText: 'My Cart' });
  productsList = this.page
    .getByRole('listitem')
    .locator('a > h2')
    .filter({ hasNot: this.page.locator('> mark') });

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

  async getRandomProductName(): Promise<string> {
    const productNames = await this.productsList.allInnerTexts();
    return await getRandomValue(productNames);
  }
}
