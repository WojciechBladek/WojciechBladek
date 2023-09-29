import { CartPage } from '../pages/cart.page';
import { ShopPage } from '../pages/shop.page';

describe('Verify shop', () => {
  it('Add item to cart', () => {
    // Arrange
    const shopPage = new ShopPage();
    const cartPage = new CartPage();

    // Act
    shopPage.goto();
    shopPage.addRandomProductToMyCart();
    shopPage.clickMyCartButton();

    //Assert
    cy.get('@exceptedName').then((exceptedName) => {
      cartPage.productName().should('have.text', exceptedName);
    });
  });
});
