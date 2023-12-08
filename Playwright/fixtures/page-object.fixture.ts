import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { RegisterPage } from '../pages/register.page';
import { ShopPage } from '../pages/shop.page';
import { test as baseTest } from '@playwright/test';

interface Pages {
  shopPage: ShopPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  registerPage: RegisterPage;
}

export const pageObjectTest = baseTest.extend<Pages>({
  shopPage: async ({ page }, use) => {
    const shopPage = new ShopPage(page);
    await shopPage.goto();
    await use(shopPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
    await use(checkoutPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
});
