//import { test, expect} from '@playwright/test';
import { imapConfigAdmin } from "../../../mailBox";
import { Api } from "../fixtures/api.fixtures";
import { Users } from "../fixtures/users.fixtures";
import { CsvPage } from "../pages/csv.pages";
import { test, expect } from "../fixtures/users.fixtures";

const user = new Api(Users.authFileUser, Users.user);
//const admin = new Api(Users.authFileAdmin, Users.userAdmin)

test.describe("Test csv features request, download", async () => {
  test.use({ storageState: Users.authFileUser });
  let csvPage: CsvPage;
  let nonLoggedCsv: CsvPage;
  test.beforeEach(async ({ page, request, UnloggedUserPage }) => {
    csvPage = new CsvPage(page);
    nonLoggedCsv = new CsvPage(UnloggedUserPage.page);

    await user.checkIfTokenIsActive(page, request, imapConfigAdmin);
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("Click download csv as non logged user", async ({
    UnloggedUserPage,
  }) => {
    // Act
    await UnloggedUserPage.page.goto("/");
    await nonLoggedCsv.csvButtonDownload.click();

    // Assert
    await expect
      .soft(UnloggedUserPage.page)
      .toHaveURL("/auth/magic-link-login");
    await expect
      .soft(nonLoggedCsv.accountRequired)
      .toHaveText(nonLoggedCsv.expectedTextNeedAcount);
  });

  test("Open csv modal", async ({ page }) => {
    // Act
    await expect.soft(csvPage.csvModal).not.toBeVisible();
    await csvPage.csvButtonDownload.click();

    // Assert
    await expect.soft(csvPage.csvModal).toBeVisible();
  });

  test("Send request to join free plan csv", async ({ page }) => {
    // Act
    await csvPage.csvButtonDownload.click();
    const resultPromise = user.resultPromise(
      page,
      user.endpoints.subscriptionRequest
    );
    const requestPromise = user.requestPromise(
      page,
      user.endpoints.subscriptionRequest
    );

    await csvPage.applyFreeButton.first().click();
    const response = (await resultPromise).status();
    const responseText = (await requestPromise).postDataJSON().access;

    // Assert
    await expect.soft(response).toBe(201);
    await expect.soft(responseText).toEqual(csvPage.plan[0]);
  });

  test("Send request to join premium plan csv", async ({ page }) => {
    // Act
    await csvPage.csvButtonDownload.click();
    const resultPromise = user.resultPromise(
      page,
      user.endpoints.subscriptionRequest
    );
    const requestPromise = user.requestPromise(
      page,
      user.endpoints.subscriptionRequest
    );

    await csvPage.applyPremiumButton.first().click();
    const response = (await resultPromise).status();
    const responseText = (await requestPromise).postDataJSON().access;

    // Assert
    await expect.soft(response).toBe(201);
    await expect.soft(responseText).toEqual(csvPage.plan[1]);
  });

  test("After click reject button on csv modal action record user activity", async ({
    page,
  }) => {
    // Act
    await csvPage.csvButtonDownload.click();
    const resultPromise = user.resultPromise(
      page,
      user.endpoints.recordCsvActivity
    );
    await csvPage.csvModalRejectButton.click();
    const response = (await resultPromise).status();

    // Assert
    await expect.soft(response).toBe(200);
  });

  test("After click reject icon [X] on csv modal action record user activity", async ({
    page,
  }) => {
    // Act
    await csvPage.csvButtonDownload.click();
    const resultPromise = user.resultPromise(
      page,
      user.endpoints.recordCsvActivity
    );
    await csvPage.csvModalRejectIcon.click();
    const response = (await resultPromise).status();

    // Assert
    await expect.soft(response).toBe(200);
  });

  test("After click on body csv modal close and record user activity", async ({
    page,
  }) => {
    // Act
    await csvPage.csvButtonDownload.click();
    const resultPromise = user.resultPromise(
      page,
      user.endpoints.recordCsvActivity
    );
    await page.waitForTimeout(1000);
    await page.mouse.click(0, 3000);
    const response = (await resultPromise).status();

    // Assert
    await expect.soft(response).toBe(200);
  });
  //TODO:
  // need to create a new accounts with aliases.
  // add test for generate tokens
  // download as user with token
  // downaload as user with organization - token
});
