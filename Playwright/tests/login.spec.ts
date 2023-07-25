import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { faker } from "@faker-js/faker";
import { Authentication, loginData } from "../helper/auth.helper";

test.describe("Login to the application", () => {
  let loginPage: LoginPage;
  let auth: Authentication;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    auth = new Authentication(loginData);
    await page.goto("/my-account", { waitUntil: "networkidle" });
  });

  test("Login with correct username and password", async () => {
    // ARRANGE
    await loginPage.loginToApp(auth.email, auth.password);

    // ASSERT
    expect(await loginPage.loginConfirm.textContent()).toEqual(
      `Hello ${loginPage.exceptedUserName} (not ${loginPage.exceptedUserName}? Log out)`
    );
  });

  test("Try login without username and password", async () => {
    // ARRANGE
    await loginPage.loginToApp();

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      "Error: Username is required."
    );
  });

  test("Try login with incorrect Username", async () => {
    //ACT
    const incorrectUserName = faker.internet.userName();

    // ARRANGE
    await loginPage.loginToApp(incorrectUserName, auth.password);

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      `Error: The username ${incorrectUserName} is not registered on this site. If you are unsure of your username, try your email address instead.`
    );
  });

  test("Try login with incorrect email adress", async () => {
    //ACT
    const incorrectEmail = faker.internet.email();

    // ARRANGE
    await loginPage.loginToApp(incorrectEmail, auth.password);

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      "Error: A user could not be found with this email address."
    );
  });

  test("Try login with incorrect Password", async () => {
    //ACT
    const incorrectPassword = faker.internet.password();

    // ARRANGE
    await loginPage.loginToApp(auth.email, incorrectPassword);

    // ASSERT
    expect(await loginPage.loginError.textContent()).toEqual(
      `Error: The password you entered for the username ${auth.email} is incorrect. Lost your password?`
    );
  });
});
