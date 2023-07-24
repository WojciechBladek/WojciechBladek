import { faker } from "@faker-js/faker";
import { Page } from "@playwright/test";
import fs from "fs";
import { Api } from "../fixtures/api.fixtures";

const localisation = fs.readFileSync("src/assets/localisation/en.json", {
  encoding: "utf8",
});
const translations = JSON.parse(localisation);
const registrationTranslations = translations.auth;

const API = new Api();
export class RegistrationPage {
  constructor(
    private page: Page,
    private userRole?: string,
    private id?: string
  ) {}
  userMeMock = {
    nickname: null,
    email: this.userRole,
    firstName: null,
    lastName: null,
    registrationStatus: "require_profile_update",
    id: this.id,
    organisation: null,
    notifications: true,
    reminders: false,
    role: 0,
    hideLastName: false,
    validityTimeInDays: null,
    plan: null,
  };

  firstNameInput = this.page.getByTestId("firstName");
  lastNameInput = this.page.getByTestId("lastName");
  continueButton = this.page.getByTestId("continue-button");
  currentStep = this.page.getByTestId("wrapper__current-step");
  inputError = this.page.getByTestId("input__error");
  toggleSlider = this.page.getByTestId("slider");

  organisationDropDown = this.page.getByTestId("autocomplete-loop-input");
  organisationDropDownOpen = this.page.getByTestId("autocomplete__icon");
  organisationDropDownItem = this.page.getByTestId(
    "autocomplete-loop-select-option"
  );
  checkBoxTerms = this.page.getByTestId("checkbox");
  toastAccountCreated = this.page.getByTestId("toast-message");
  autocompletePill = this.page.getByTestId("autocomplete__pill");

  createOrganisationModal = this.page.getByTestId("organisation-modal");
  organisationSearch = this.organisationDropDown.getByTestId(
    "organisation-modal-input"
  );
  organisation = this.page.getByTestId("organisation-modal-input");
  organisationInput = this.page.locator("#input1");

  createNewOrgModalInputName = this.createOrganisationModal
    .getByTestId("organisation-modal-input")
    .locator("> input")
    .first();

  fakerFirstName = faker.person.firstName();
  fakerLastName = faker.person.lastName();
  fakerOrganisationName = faker.company.name();
  expectAccountCreated =
    registrationTranslations.acceptTerms.userCreatedToast.success;
  specialCharacters = "@!$%^&&*@";
  step1 = "Step 1 of 3";
  step2 = "Step 2 of 3";
  step3 = "Step 3 of 3";
  inputErrorText =
    registrationTranslations.registerIndividual.form.errors.required;
  regexErrorText =
    registrationTranslations.registerIndividual.form.errors.pattern;
  minLengthError =
    registrationTranslations.registerIndividual.form.errors.minLength.replace(
      "{{requiredLength}}",
      "2"
    );

  async mockApiResponseUserMe() {
    await this.page.route(`*/**/${API.endpoints.userMe}`, async (route) => {
      const json = this.userMeMock;
      await route.fulfill({ json });
    });
  }
}
