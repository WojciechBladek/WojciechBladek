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
    cartPage.productName().then(($product) => {
      const productName = $product.text();
      cy.get('@exceptedName').then((exceptedName) => {
        expect(exceptedName).to.contain(productName);
      });
    });
  });
});
