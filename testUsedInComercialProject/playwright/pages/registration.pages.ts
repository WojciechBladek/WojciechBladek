import { Page } from '@playwright/test';
import { lokalise } from 'playwright/helper/read-translations.helper';

export class RegistrationPage {
  constructor(private page: Page) {}

  //multiple re-used locators
  sliderLocator = 'slider'
  organisationModalLocator = 'organisation-modal'
  organisationModalInputLocator = 'organisation-modal-input'
  inputLocator = 'input'
  autoCompleteIconLocator = 'autocomplete__icon'

  firstNameInput = this.page.getByTestId('firstName');
  lastNameInput = this.page.getByTestId('lastName');
  continueButton = this.page.getByTestId('continue-button');
  currentStep = this.page.getByTestId('wrapper__current-step');
  inputError = this.page.getByTestId('input__error');
  toggleSlider = this.page.getByTestId(this.sliderLocator);

  organisationDropDown = this.page.getByTestId('autocomplete-loop-input');
  organisationDropDownOpen = this.page.getByTestId(this.autoCompleteIconLocator);
  organisationDropDownItem = this.page.getByTestId('autocomplete-loop-select-option');
  checkBoxTerms = this.page.getByTestId('checkbox');
  toastAccountCreated = this.page.getByTestId('toast-message');
  autocompletePill = this.page.getByTestId('autocomplete__pill');

  createOrganisationModal = this.page.getByTestId(this.organisationModalLocator);
  organisationSearch = this.organisationDropDown.getByTestId(this.organisationModalInputLocator);
  organisation = this.page.getByTestId(this.organisationModalInputLocator);
  organisationInput = this.page.locator('#input1');

  countryDropDownOpen = this.page.getByTestId(this.organisationModalLocator).getByTestId(this.autoCompleteIconLocator);
  createNewOrganisationButton = this.createOrganisationModal.getByTestId('button').last();
  createOrgModalSlider = this.createOrganisationModal.getByTestId(this.sliderLocator);
  createNewOrgModalInputName = this.createOrganisationModal.getByTestId(this.organisationModalInputLocator).locator(`> ${this.inputLocator}`).first();
  createNewOrgModalInputAcronym = this.createOrganisationModal.getByTestId(this.organisationModalInputLocator).locator(`> ${this.inputLocator}`).nth(1);

  expectAccountCreated = lokalise.auth.acceptTerms.userCreatedToast.success;
  specialCharacters = '@!$%^&&*@';
  step1 = 'Step 1 of 3';
  step2 = 'Step 2 of 3';
  step3 = 'Step 3 of 3';
  inputErrorText = lokalise.auth.registerIndividual.form.errors.required;
  regexErrorText = lokalise.auth.registerIndividual.form.errors.pattern;
  minLengthError = lokalise.auth.registerIndividual.form.errors.minLength.replace('{{requiredLength}}', '2');
}
