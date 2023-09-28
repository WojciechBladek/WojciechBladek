import { Locator } from '../support/types';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  url = '/shop/';

  cartIsEmptyText(): Locator {
    return cy.get('.cart-empty');
  }

  productName(): Locator {
    return cy.get('.product-name').find('a');
  }

  constructor() {
    super();
  }
}
