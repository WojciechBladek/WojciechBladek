import { test, expect } from "@playwright/test";
import { imapConfigUser } from "../../../mailBox";
import { Api } from "../fixtures/api.fixtures";
import { Users } from "../fixtures/users.fixtures";
import { RegistrationPage } from "../pages/registration.pages";

const user = new Api(Users.authFileUser, Users.user);

test.describe("Registration flow", async () => {
  test.use({ storageState: Users.authFileUser });
  let registration: RegistrationPage;

  test.beforeEach(async ({ page, request }) => {
    // Arrange
    const userId = await user.requestGet(
      request,
      user.endpoints.userMe,
      user.loggedHeaders
    );
    registration = new RegistrationPage(page, Users.user, userId.id);
    await user.checkIfTokenIsActive(page, request, imapConfigUser);
    //Mock data is used, temporarily
    await registration.mockApiResponseUserMe();
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("New user was created", async ({ page, request }) => {
    // Act
    const userProfile = await user.requestGet(
      request,
      user.endpoints.userMe,
      user.loggedHeaders
    );

    // Asert
    await expect(userProfile).toHaveProperty("email", Users.user);
    await expect(page).toHaveURL("/auth/register");
  });

  test("Step 1 fill firstName when all fields are mandatory", async ({
    page,
  }) => {
    // Act
    await registration.firstNameInput.fill(registration.fakerFirstName);

    // Assert
    await expect(registration.firstNameInput).toHaveValue(
      registration.fakerFirstName
    );
    await registration.continueButton.click();
    await expect(registration.inputError.last()).toHaveText(
      registration.inputErrorText
    );
  });

  test("Step 1 fill lastName when all fields are mandatory", async ({
    page,
  }) => {
    // Act
    await registration.lastNameInput.fill(registration.fakerLastName);

    // Assert
    await expect(registration.lastNameInput).toHaveValue(
      registration.fakerLastName
    );
    await registration.continueButton.click();
    await expect(registration.inputError.first()).toHaveText(
      registration.inputErrorText
    );
  });

  test("Step 1 try to go to next step with empty firstName and lastName", async ({
    page,
  }) => {
    // Act
    await registration.firstNameInput.clear();
    await registration.lastNameInput.clear();

    // Assert
    await registration.continueButton.click();
    await expect(registration.inputError.first()).toHaveText(
      registration.inputErrorText
    );
    await expect(registration.inputError.last()).toHaveText(
      registration.inputErrorText
    );
  });

  test("Step 1 fill firstName and lastName with special characters", async ({
    page,
  }) => {
    // Act
    await registration.firstNameInput.fill(
      `${registration.fakerFirstName}${registration.specialCharacters}`
    );
    await registration.lastNameInput.fill(
      `${registration.fakerLastName}${registration.specialCharacters}`
    );

    // Assert
    await registration.continueButton.click();
    await expect(registration.inputError.first()).toHaveText(
      registration.regexErrorText
    );
    await expect(registration.inputError.last()).toHaveText(
      registration.regexErrorText
    );
  });

  test("Step 1 fill firstName and lastName with 1 character", async ({
    page,
  }) => {
    // Act
    await registration.firstNameInput.fill("T");
    await registration.lastNameInput.fill("Z");

    // Assert
    await registration.continueButton.click();
    await expect(registration.inputError.first()).toHaveText(
      registration.minLengthError
    );
    await expect(registration.inputError.last()).toHaveText(
      registration.minLengthError
    );
  });

  test("Step 1 check toggle button behavior hide my lastName", async ({
    page,
  }) => {
    // Act
    await registration.toggleSlider.setChecked(true);

    // Assert
    await expect(registration.toggleSlider).toBeChecked();
  });
  //TODO:
  test("Create new organisation", async ({ page, request }) => {
    // Arrange
    const organisationName = registration.fakerOrganisationName;

    // Act
    await registration.firstNameInput.fill(registration.fakerFirstName);
    await registration.lastNameInput.fill(registration.fakerLastName);

    // Assert
    await expect(registration.firstNameInput).toHaveValue(
      registration.fakerFirstName
    );
    await expect(registration.lastNameInput).toHaveValue(
      registration.fakerLastName
    );
    await registration.continueButton.click();
    await expect(await registration.currentStep.textContent()).toEqual(
      registration.step2
    );

    await test.step("Check if the pill has the same organization name that was entered", async () => {
      // Act
      await registration.organisationSearch.click();
      await registration.organisationInput.fill(organisationName);
      await registration.organisationDropDownOpen.click();

      // Assert
      await expect(await registration.autocompletePill.textContent()).toEqual(
        organisationName
      );
    });

    await test.step("Should open modal to create new organisation", async () => {
      // Act
      await registration.autocompletePill.click();

      // Assert
      await expect(registration.createOrganisationModal).toBeVisible();
    });
    //TODO:
    await test.step("Text in modal input is equal to organisation name", async () => {
      // Assert
      await expect(
        await registration.createNewOrgModalInputName.inputValue()
      ).toEqual(organisationName);
    });
  });

  test("Create user profile with organisation", async ({ page, request }) => {
    // Act
    await registration.firstNameInput.fill(registration.fakerFirstName);
    await registration.lastNameInput.fill(registration.fakerLastName);

    // Assert
    await expect(registration.firstNameInput).toHaveValue(
      registration.fakerFirstName
    );
    await expect(registration.lastNameInput).toHaveValue(
      registration.fakerLastName
    );
    await registration.continueButton.click();
    await expect(await registration.currentStep.textContent()).toEqual(
      registration.step2
    );

    await test.step("Select organisation from dropdown", async () => {
      // Act
      await registration.organisationDropDownOpen.click();
      await registration.organisationDropDownItem.first().click();

      // Assert
      await expect(registration.firstNameInput).toHaveValue(
        registration.fakerFirstName
      );
      await expect(registration.lastNameInput).toHaveValue(
        registration.fakerLastName
      );
    });
    await test.step("Agree terms of service and done registration  ", async () => {
      // Act
      await registration.continueButton.click();
      await registration.checkBoxTerms.setChecked(true);

      // Assert
      await expect(registration.checkBoxTerms).toBeChecked();
      await expect(await registration.currentStep.textContent()).toEqual(
        registration.step3
      );
    });
    await test.step("User profile was created  ", async () => {
      // Act
      await registration.continueButton.click();

      // Assert
      await expect(
        await registration.toastAccountCreated
          .textContent()
          .then((el) => el?.trim())
      ).toEqual(registration.expectAccountCreated);
      const userMeResponse = await user.requestGet(
        request,
        user.endpoints.userMe,
        user.loggedHeaders
      );
      await expect(userMeResponse).toHaveProperty(
        "registrationStatus",
        "awating_to_assign_to_organisation"
      );
    });
  });
});
