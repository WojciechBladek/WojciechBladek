import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("Login to the application", () => {
  let loginPage: LoginPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/my-account", { waitUntil: "networkidle" });
  });

  test("Login with correct username and password", async ({ page }) => {
    // ARRANGE
    await loginPage.loginToApp(loginPage.email, loginPage.password);

    // ASSERT
    expect(await loginPage.loginConfirm.textContent()).toEqual(
      `Hello ${loginPage.exceptedUserName} (not ${loginPage.exceptedUserName}? Log out)`
    );
  });

  test("Try login without username and password", async ({ page }) => {
    // ARRANGE
    await loginPage.loginToApp();

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      "Error: Username is required."
    );
  });

  test("Try login with incorrect Username", async ({ page }) => {
    //ACT
    const incorrectUserName = 'Test12345@gm'

    // ARRANGE
    await loginPage.loginToApp(incorrectUserName,loginPage.password);

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      `Error: The username ${incorrectUserName} is not registered on this site. If you are unsure of your username, try your email address instead.`
    );
  });

  test("Try login with incorrect Password", async ({ page }) => {
    //ACT
    const incorrectPassword = 'Test123@3!!@3'

    // ARRANGE
    await loginPage.loginToApp(loginPage.email,incorrectPassword);

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      `Error: The password you entered for the username ${loginPage.email} is incorrect. Lost your password?`
    );
  });
});
