import { CartPage } from '../pages/cart.page';
import { ShopPage } from '../pages/shop.page';

describe('Verify shop', () => {
  beforeEach(() => {
    cy.login();
  });
  it('Add item to cart', () => {
    // Arrange
    const shopPage = new ShopPage();
    const cartPage = new CartPage();

    // Act
    shopPage.goto();
    shopPage.addRandomProductToMyCart();
    shopPage.myCartButton().click();

    //Assert
    cy.get('@exceptedName').then((exceptedName) => {
      cartPage.productName().should('have.text', exceptedName);
    });
  });
  it('Open shop page', () => {
    // Arrange
    const cartPage = new CartPage();

    // Act
    cartPage.goto();
  });
});
