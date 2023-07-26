import { test as base, type Page, type Locator } from "@playwright/test";
import { envData } from "./mailBox";

class AdminPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

class UserPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

class UnloggedUserPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

type MyFixtures = {
  adminPage: AdminPage;
  userPage: UserPage;
  unloggedUserPage: UnloggedUserPage;
};

export * from "@playwright/test";
export const test = base.extend<MyFixtures>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Users.authFileAdmin,
    });
    const adminPage = new AdminPage(await context.newPage());
    await use(adminPage);
    await context.close();
  },

  userPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Users.authFileUser,
    });
    const userPage = new UserPage(await context.newPage());
    await use(userPage);
    await context.close();
  },

  unloggedUserPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Users.authFileUnlogged,
    });
    const unloggedUserPage = new UnloggedUserPage(await context.newPage());
    await use(unloggedUserPage);
    await context.close();
  },
});

export class Users {
  static userAdmin = envData.admin.email;
  static authFileAdmin = "playwright/.auth/admin.json";
  static user = envData.user.email;
  static authFileUser = "playwright/.auth/user.json";
  static authFileUnlogged = "playwright/.auth/unlogged.json";
}
