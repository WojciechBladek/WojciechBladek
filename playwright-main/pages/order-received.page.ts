import { BasePage } from '@_playwright-main/pages/base.page';
import { Page } from '@playwright/test';

export class OrderReceivedPage extends BasePage {
  url = 'checkout/order-received/';

  orderReceivedText = this.page.locator('#post-7 > div.woocommerce > div > p');

  constructor(page: Page) {
    super(page);
  }
}
