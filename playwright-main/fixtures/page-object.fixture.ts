import { CartPage } from '@_playwright-main/pages/cart.page';
import { CheckoutPage } from '@_playwright-main/pages/checkout.page';
import { LoginPage } from '@_playwright-main/pages/login.page';
import { RegisterPage } from '@_playwright-main/pages/register.page';
import { ShopPage } from '@_playwright-main/pages/shop.page';
import { test as baseTest } from '@playwright/test';

interface Pages {
  shopPage: ShopPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
}

export const pageObjectTest = baseTest.extend<Pages>({
  shopPage: async ({ page }, use) => {
    const shopPage = new ShopPage(page);
    await shopPage.goto();
    await use(shopPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
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
