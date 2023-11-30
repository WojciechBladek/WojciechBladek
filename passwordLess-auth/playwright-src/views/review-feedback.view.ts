import { Locator, Page } from '@playwright/test';
import { InboxPage } from '@_playwright-src/pages/inbox.pages';
import { ThematicAreaView } from '@_playwright-src/views/thematic-area.view';

export class ReviewFeedbackView {
  thematicAreaView = new ThematicAreaView(this.page);

  feedbackContentInput = this.page.getByTestId('loop-textarea-textarea').first();
  feedbackEditContentInput = this.page.getByTestId('loop-textarea-textarea').last();
  authorInput = this.page.getByPlaceholder('Keep author anonymous');
  organizationInput = this.page.getByTestId('organisation-list').getByTestId('simple-tag__name');
  thematicAreaButton = this.page.getByTestId('form-section-app-fab-btn-add');
  translateButton = this.page.getByTestId('submit-button').locator('>button');
  publishFeedbackButton = this.page.getByRole('button', { name: 'Publish feedback' });
  rejectButton = this.page.getByTestId('reject-button');
  alertPopUp = this.page.getByLabel('Please fill in all the elements marked with “required” in order to proceed.');
  editFeedbackToggleButton = this.page.locator('.slider-container').getByTestId('slider').first();
  invalidContentLengthPopUp = this.page.getByTestId('validationError').last();

  constructor(private page: Page) {}

  async publishFeedback(): Promise<InboxPage> {
    await this.thematicAreaButton.click();
    await this.thematicAreaView.setThematicAreaCategory();
    await this.translateButton.click();
    await this.publishFeedbackButton.click();
    return new InboxPage(this.page);
  }

  async goToTranslateStep(): Promise<InboxPage> {
    await this.thematicAreaButton.click();
    await this.thematicAreaView.setThematicAreaCategory();
    await this.translateButton.click();
    return new InboxPage(this.page);
  }

  async clickPublishFeedbackButton(): Promise<InboxPage> {
    await this.publishFeedbackButton.click();
    return new InboxPage(this.page);
  }

  async saveEditedFeedbackContent(content?: string): Promise<void> {
    await this.editFeedbackToggleButton.click();
    content ? await this.feedbackEditContentInput.fill(content) : await this.feedbackEditContentInput.clear();
    await this.translateButton.click();
  }

  async getFeedbackInputValue(): Promise<string> {
    const feedbackValue = await this.feedbackContentInput.inputValue();
    return feedbackValue;
  }

  checkTypeOfFeedbackLocator(typeOfFeedbackName: string): Locator {
    return this.page.locator('label').filter({ hasText: typeOfFeedbackName }).first();
  }

  async authorInputValue(): Promise<string> {
    return await this.authorInput.inputValue();
  }

  checkAgeLocator(ageText: string): Locator {
    return this.page.locator('label').filter({ hasText: ageText }).first();
  }

  checkGenderLocator(genderText: string): Locator {
    return this.page.locator('label').filter({ hasText: genderText }).first();
  }

  checkDisabilityLocator(DisabilityText: string): Locator {
    return this.page.locator('label').filter({ hasText: DisabilityText }).first();
  }

  checkLocationLocator(value: string): Locator {
    return this.page.locator('app-location').getByText(value);
  }

  async returnOrganizationName(): Promise<string> {
    return await this.organizationInput.innerText();
  }
}
