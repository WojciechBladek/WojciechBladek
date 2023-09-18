import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CartPage extends BasePage {
  url = '/cart/';

  constructor(page: Page) {
    super(page);
  }
}
