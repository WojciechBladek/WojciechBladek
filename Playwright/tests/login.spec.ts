import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { faker } from "@faker-js/faker";

test.describe("Login to the application", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/my-account", { waitUntil: "networkidle" });
  });

  test("Login with correct username and password", async ({ page }) => {
    // ARRANGE
    await loginPage.loginToApp(loginPage.useEmail(), loginPage.usePassword());

    // ASSERT
    expect(await loginPage.loginConfirm.textContent()).toEqual(
      `Hello ${loginPage.useExceptedUserName()} (not ${loginPage.useExceptedUserName()}? Log out)`
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
    const incorrectUserName = faker.internet.userName();

    // ARRANGE
    await loginPage.loginToApp(incorrectUserName, loginPage.usePassword());

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      `Error: The username ${incorrectUserName} is not registered on this site. If you are unsure of your username, try your email address instead.`
    );
  });

  test("Try login with incorrect email adress", async ({ page }) => {
    //ACT
    const incorrectEmail = faker.internet.email();

    // ARRANGE
    await loginPage.loginToApp(incorrectEmail, loginPage.usePassword());

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      'Error: A user could not be found with this email address.'
    );
  });

  test("Try login with incorrect Password", async ({ page }) => {
    //ACT
    const incorrectPassword = faker.internet.password();

    // ARRANGE
    await loginPage.loginToApp(loginPage.useEmail(), incorrectPassword);

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      `Error: The password you entered for the username ${loginPage.useEmail()} is incorrect. Lost your password?`
    );
  });
});
