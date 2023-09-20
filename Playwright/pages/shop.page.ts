import { getRandomValue } from '../helpers/randomValue.helper';
import { BasePage } from './base.page';
import { CartPage } from './cart.page';
import { Locator, Page } from '@playwright/test';

export class ShopPage extends BasePage {
  url = '/shop/';
  cartPage = new CartPage(this.page);

  myCartButton = this.page.locator(
    '#page > header.top-header-bar-container > div > div > div > ul > li.top-cart',
  );
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

  async productNameLocator(productName: string): Promise<Locator> {
    return this.page.getByRole('link', { name: `${productName}` });
  }

  async getRandomProductName(): Promise<string> {
    const productNames = await this.productsList.allInnerTexts();
    return await getRandomValue(productNames);
  }

  async clickMyCartButton(): Promise<void> {
    await this.myCartButton.click();
    if (this.cartPage.cartIsEmpty) {
      await this.myCartButton.click();
    }
  }
}
