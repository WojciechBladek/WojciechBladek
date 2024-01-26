import { Locator } from '../support/types';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  url = '/cart/';

  get cartIsEmptyText(): Locator {
    return cy.get('.cart-empty');
  }

  get productName(): Locator {
    return cy.get('.product-name').find('a');
  }

  constructor() {
    super();
  }
}
