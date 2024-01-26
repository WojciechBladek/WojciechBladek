import { CartPage } from '../pages/cart.page';
import { ShopPage } from '../pages/shop.page';

describe('Verify shop', () => {
  const cartPage = new CartPage();
  beforeEach(() => {
    cy.login();
  });
  it('Add item to cart', () => {
    // Arrange
    const shopPage = new ShopPage();

    // Act
    shopPage.goto();
    shopPage.addRandomProductToMyCart();
    shopPage.myCartButton.click();

    //Assert
    cy.get('@exceptedName').then((exceptedName) => {
      cartPage.productName.should('have.text', exceptedName);
    });
  });
  //TODO: wip
  it.skip('Open shop page', () => {
    // Act
    cartPage.goto();
  });
});
