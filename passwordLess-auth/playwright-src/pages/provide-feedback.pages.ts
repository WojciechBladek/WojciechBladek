import { Page } from '@playwright/test';
import { BasePage } from '@_playwright-src/pages/base.page';
import { getRandomNumber } from 'playwright-src/helpers/randomValue.helper';
import { ProvideFeedbackModel } from 'playwright-src/models/feedback.model';
import { SetLocationView } from 'playwright-src/views/set-location.view';
import { SetOrganizationView } from 'playwright-src/views/set-organization.view';

interface PersonalUserFeedbackData {
  feedbackContent: string;
  typeOfFeedback?: string;
  location?: string;
  organization?: string;
  userName?: string;
  userPhone?: string;
  userEmail?: string;
  userGender?: string;
  userAge?: string;
  userCondition?: string;
}

export class ProvideFeedbackPage extends BasePage {
  setLocationView = new SetLocationView(this.page);
  setOrganizationView = new SetOrganizationView(this.page);
  url = '/provide-feedback';

  writeFeedbackTextArea = this.page.locator('.share-content__input').locator('textarea');
  modalCloseButton = this.page.getByRole('button', { name: 'Start writing your feedback' });
  nextButton = this.page.getByRole('button', { name: 'Next' });
  consentCheckbox = this.page.locator('.checkbox__element');
  submitFeedbackButton = this.page.getByRole('button', { name: 'Submit feedback' });
  typeOfFeedbackCheckbox = this.page.getByTestId('story-type-boxgroup-checkbox');
  userNameInput = this.page.getByTestId('what-is-your-name-loop-input').locator('.loop-input').locator('> input');
  userPhoneDropDownButton = this.page.locator('.phone-picker__input-country-dropdown');
  userPhoneInput = this.page.locator('input[type="tel"]');
  userEmailInput = this.page.getByTestId('email-section-loop-input').locator('div > input');
  userGenderInput = this.page.getByTestId('gender-section-loop-new-story-radio').locator("[class='radio clickable']");
  userAgeInput = this.page.getByTestId('age-section-loop-new-story-radio').locator("[class='radio clickable']");
  userConditionInput = this.page.getByTestId('condition-section-loop-new-story-radio').locator("[class='radio clickable']");

  alertPopUpFeedbackSubmitted = this.page.getByLabel('Feedback submitted');
  alertInvalidFeedbackContent = this.page.locator("[class='share-content__input invalid']");

  constructor(page: Page) {
    super(page);
  }

  async closeModal(): Promise<void> {
    if (this.modalCloseButton) {
      await this.modalCloseButton.click();
      await this.modalCloseButton.isHidden();
    }
  }

  async feedbackWithInvalidContentLength(content: ProvideFeedbackModel): Promise<PersonalUserFeedbackData> {
    await this.writeFeedbackTextArea.fill(content.body);
    const body = await this.writeFeedbackTextArea.inputValue();
    await this.nextButton.click({ delay: 50 });
    return {
      feedbackContent: body,
    };
  }

  async provideSimpleValidFeedback(content: ProvideFeedbackModel): Promise<void> {
    await this.writeFeedbackTextArea.fill(content.body);
    await this.nextButton.click({ delay: 50 });
    await this.nextButton.click({ delay: 50 });
    await this.nextButton.click({ delay: 50 });
    await this.consentCheckbox.check();
    await this.submitFeedbackButton.click();
  }

  async provideFeedbackWithAllFields(content: ProvideFeedbackModel): Promise<PersonalUserFeedbackData> {
    const feedbackContent = content.body;
    const userPhone = content.phone;
    const userName = content.name;
    const userEmail = content.email;

    // view 1
    await this.writeFeedbackTextArea.fill(content.body);
    const typeOfFeedback = await this.checkRandomTypeOfFeedbackOptions();
    await this.nextButton.click({ delay: 50 });

    // view 2
    const location = await this.setLocationView.getRandomLocation();
    const organization = await this.setOrganizationView.selectRandomOrganization();
    await this.nextButton.click({ delay: 50 });

    // view 3
    await this.userNameInput.clear();
    await this.userNameInput.fill(content.name);
    await this.userPhoneDropDownButton.click();
    await this.page.getByRole('option', { name: 'Poland (+48)' }).click();
    await this.userPhoneInput.fill(userPhone);
    await this.userEmailInput.fill(userEmail);
    const userGender = await this.checkRandomGenderOptions();
    const userAge = await this.checkRandomAgeOptions();
    const userCondition = await this.checkRandomConditionOptions();
    await this.nextButton.click({ delay: 50 });

    // view 4
    await this.consentCheckbox.check();
    await this.submitFeedbackButton.click({ delay: 50 });

    return {
      feedbackContent: feedbackContent,
      typeOfFeedback: typeOfFeedback,
      location: location,
      organization: organization,
      userName: userName,
      userPhone: userPhone,
      userEmail: userEmail,
      userGender: userGender,
      userAge: userAge,
      userCondition: userCondition,
    };
  }

  async checkRandomTypeOfFeedbackOptions(): Promise<string> {
    let inputText: string;
    const randomNumber = getRandomNumber(4);
    for (let i = 0; i < randomNumber; i++) {
      await this.typeOfFeedbackCheckbox.nth(i).click();
      inputText = await this.typeOfFeedbackCheckbox.nth(i).textContent();
    }
    return inputText;
  }

  async checkRandomGenderOptions(): Promise<string> {
    const randomNumber = getRandomNumber(2);
    await this.userGenderInput.nth(randomNumber).check();
    const inputText = await this.userGenderInput.nth(randomNumber).textContent();
    return inputText;
  }

  async checkRandomAgeOptions(): Promise<string> {
    const randomNumber = getRandomNumber(3);
    await this.userAgeInput.nth(randomNumber).check();
    const inputText = await this.userAgeInput.nth(randomNumber).textContent();
    return inputText;
  }

  async checkRandomConditionOptions(): Promise<string> {
    const randomNumber = getRandomNumber(1);
    await this.userConditionInput.nth(randomNumber).check();
    const inputText = await this.userConditionInput.nth(randomNumber).textContent();
    return inputText;
  }
}
