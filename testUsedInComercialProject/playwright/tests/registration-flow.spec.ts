import { test, expect } from '@playwright/test';
import { imapConfigUser } from 'mailBox';
import { mockJson } from 'playwright/fixtures/api-mocks.fixtures';
import { Api } from 'playwright/fixtures/api.fixtures';
import { Faker } from 'playwright/fixtures/faker.fixtures';
import { Users } from 'playwright/fixtures/users.fixtures';
import { RegistrationPage } from 'playwright/pages/registration.pages';

const { userMeMock, mockApiResponseUserMe } = mockJson;

const user = new Api(Users.authFileUser, Users.user);

test.describe('Registration flow', async () => {
  test.use({ storageState: Users.authFileUser });
  let registration: RegistrationPage;

  test.beforeEach(async ({ page, request }) => {
    // Arrange
    const userId = await user.requestGet(request, user.endpoints.userMe, user.loggedHeaders.authBearerToken);
    registration = new RegistrationPage(page);
    await user.checkIfTokenIsActive(page, request, imapConfigUser);
    await mockApiResponseUserMe(page, user.endpoints.userMe, userMeMock(Users.user, userId.id));
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('New user was created', async ({ page, request }) => {
    // Act
    const userProfile = await user.requestGet(request, user.endpoints.userMe, user.loggedHeaders.authBearerToken);

    // Asert
    await expect.soft(userProfile).toHaveProperty('email', Users.user);
    await expect.soft(page).toHaveURL('/auth/register');
  });

  test('Step 1 fill firstName when all fields are mandatory', async ({ page }) => {
    // Act
    await registration.firstNameInput.fill(Faker.fakerFirstName);

    // Assert
    await expect.soft(registration.firstNameInput).toHaveValue(Faker.fakerFirstName);
    await registration.continueButton.click();
    await expect.soft(registration.inputError.last()).toHaveText(registration.inputErrorText);
  });

  test('Step 1 fill lastName when all fields are mandatory', async ({ page }) => {
    // Act
    await registration.lastNameInput.fill(Faker.fakerLastName);

    // Assert
    await expect.soft(registration.lastNameInput).toHaveValue(Faker.fakerLastName);
    await registration.continueButton.click();
    await expect.soft(registration.inputError.first()).toHaveText(registration.inputErrorText);
  });

  test('Step 1 try to go to next step with empty firstName and lastName', async ({ page }) => {
    // Act
    await registration.firstNameInput.clear();
    await registration.lastNameInput.clear();

    // Assert
    await registration.continueButton.click();
    await expect.soft(registration.inputError.first()).toHaveText(registration.inputErrorText);
    await expect.soft(registration.inputError.last()).toHaveText(registration.inputErrorText);
  });

  test('Step 1 fill firstName and lastName with special characters', async ({ page }) => {
    // Act
    await registration.firstNameInput.fill(`${Faker.fakerFirstName}${registration.specialCharacters}`);
    await registration.lastNameInput.fill(`${Faker.fakerLastName}${registration.specialCharacters}`);

    // Assert
    await registration.continueButton.click();
    await expect.soft(registration.inputError.first()).toHaveText(registration.regexErrorText);
    await expect.soft(registration.inputError.last()).toHaveText(registration.regexErrorText);
  });

  test('Step 1 fill firstName and lastName with 1 character', async ({ page }) => {
    // Act
    await registration.firstNameInput.fill('T');
    await registration.lastNameInput.fill('Z');

    // Assert
    await registration.continueButton.click();
    await expect.soft(registration.inputError.first()).toHaveText(registration.minLengthError);
    await expect.soft(registration.inputError.last()).toHaveText(registration.minLengthError);
  });

  test('Step 1 check toggle button behavior hide my lastName', async ({ page }) => {
    // Act
    await registration.toggleSlider.setChecked(true);

    // Assert
    await expect.soft(registration.toggleSlider).toBeChecked();
  });

  test('Create new organisation', async ({ page }) => {
    // Arrange
    const organisationName = Faker.fakerOrganisationName;

    // Act
    await registration.firstNameInput.fill(Faker.fakerFirstName);
    await registration.lastNameInput.fill(Faker.fakerLastName);

    // Assert
    await expect.soft(registration.firstNameInput).toHaveValue(Faker.fakerFirstName);
    await expect.soft(registration.lastNameInput).toHaveValue(Faker.fakerLastName);
    await registration.continueButton.click();
    await expect.soft((await registration.currentStep.textContent()).trim()).toEqual(registration.step2);

    await test.step('Check if the pill has the same organization name that was entered', async () => {
      // Act
      await registration.organisationSearch.click();
      await registration.organisationInput.fill(organisationName);
      await registration.organisationDropDownOpen.click();

      // Assert
      await expect.soft(await registration.autocompletePill.textContent()).toEqual(organisationName);
    });

    await test.step('Should open modal to create new organisation', async () => {
      // Act
      await registration.autocompletePill.click();

      // Assert
      await expect.soft(registration.createOrganisationModal).toBeVisible();
    });

    await test.step('Text in modal input is equal to organisation name', async () => {
      // Assert
      await expect.soft(await registration.createNewOrgModalInputName.inputValue()).toEqual(organisationName);
    });

    await test.step('Add acronym for organisation', async () => {
      // Act
      await registration.createOrgModalSlider.setChecked(true);
      await registration.createNewOrgModalInputAcronym.fill(Faker.fakerOrganisationAcronym);
      await page.waitForTimeout(1000)
      await registration.countryDropDownOpen.click();
      await page.waitForTimeout(1000)
      await registration.organisationDropDownItem.last().click();

      await page.waitForTimeout(1000);
      const resultPromise = user.resultPromise(page, user.endpoints.createNewOrganisation);
      await page.waitForTimeout(1000)
      await registration.createNewOrganisationButton.click();
      const response = (await resultPromise).status();
      // Assert

      await expect.soft(response).toBe(201);
      await expect.soft(await registration.organisationInput.inputValue()).toEqual(organisationName);
    });
  });

  test('Create user profile with organisation', async ({ page, request }) => {
    // Act
    await registration.firstNameInput.fill(Faker.fakerFirstName);
    await registration.lastNameInput.fill(Faker.fakerLastName);

    // Assert
    await expect.soft(registration.firstNameInput).toHaveValue(Faker.fakerFirstName);
    await expect.soft(registration.lastNameInput).toHaveValue(Faker.fakerLastName);
    await registration.continueButton.click();
    await expect.soft((await registration.currentStep.textContent()).trim()).toEqual(registration.step2);

    await test.step('Select organisation from dropdown', async () => {
      // Act
      await registration.organisationDropDownOpen.click();
      await registration.organisationDropDownItem.first().click();

      // Assert
      await expect.soft(registration.firstNameInput).toHaveValue(Faker.fakerFirstName);
      await expect.soft(registration.lastNameInput).toHaveValue(Faker.fakerLastName);
    });
    await test.step('Agree terms of service and done registration  ', async () => {
      // Act
      await registration.continueButton.click();
      await registration.checkBoxTerms.setChecked(true);

      // Assert
      await expect.soft(registration.checkBoxTerms).toBeChecked();
      await expect.soft((await registration.currentStep.textContent()).trim()).toEqual(registration.step3);
    });
    await test.step('User profile was created  ', async () => {
      // Act
      await registration.continueButton.click();

      // Assert
      await expect.soft((await registration.toastAccountCreated.textContent()).trim()).toEqual(registration.expectAccountCreated);
      const userMeResponse = await user.requestGet(request, user.endpoints.userMe, user.loggedHeaders.authBearerToken);
      await expect.soft(userMeResponse).toHaveProperty('registrationStatus', 'awating_to_assign_to_organisation');
    });
  });
});
