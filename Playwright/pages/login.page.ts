import { Locator, Page } from "@playwright/test";
import fs from "fs";

const loginDataFile = fs.readFileSync("playwright.env.json", {
  encoding: "utf8",
});
const loginData = JSON.parse(loginDataFile);

export class LoginPage {
  constructor(private page: Page) {}

  email: string = loginData.user.email;
  password: string = loginData.user.password;

  publicEmail: string = "test.demo@gmail.com";
  publicPassword: string = "DemoTest12345@!";

  exceptedUserName: string = "magic.testbox";

  loginError: Locator = this.page.locator(
    "#post-8 > div.woocommerce > ul > li"
  );

  loginInput: Locator = this.page.locator("#username");

  loginPassword: Locator = this.page.locator("#password");

  loginButton: Locator = this.page.getByRole("button", { name: "Login" });

  loginConfirm: Locator = this.page
    .locator("#post-8 > div.woocommerce > div")
    .locator("> p")
    .first();

  async loginToApp(email: string = "", password: string = "") {
    await this.loginInput.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  useEmail() {
    if (this.email) {
      return this.email;
    } else {
      return this.publicEmail;
    }
  }
  usePassword() {
    if (this.password) {
      return this.password;
    } else {
      return this.publicPassword;
    }
  }
  useExceptedUserName() {
    if (this.email) {
      return this.exceptedUserName;
    } else {
      return "test.demo";
    }
  }
}
