import { getRandomValue } from '@_playwright-main/helpers/randomValue.helper';
import { BasePage } from '@_playwright-main/pages/base.page';
import { CartPage } from '@_playwright-main/pages/cart.page';
import { Page } from '@playwright/test';

export class ShopPage extends BasePage {
  url = '/shop/';
  cartPage = new CartPage(this.page);

  productName = this.page.locator(
    '#post-6 > div.woocommerce > form > table > tbody > tr.woocommerce-cart-form__cart-item.cart_item > td.product-name',
  );
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

  async getRandomProductName(): Promise<string> {
    const productNames = await this.productsList.allInnerTexts();
    return await getRandomValue(productNames);
  }

  async clickMyCartButton(): Promise<CartPage> {
    await this.myCartButton.click();
    if (this.cartPage.cartIsEmpty) {
      await this.myCartButton.click();
    }
    return new CartPage(this.page);
  }
}
