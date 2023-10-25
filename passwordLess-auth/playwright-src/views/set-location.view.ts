import { Page } from '@playwright/test';
import { getRandomNumber } from '@_playwright-src/helpers/randomValue.helper';

export class SetLocationView {
  setLocationButton = this.page.locator('.set-location__btn');
  setLocationDropDownList = this.page.locator('.form-check');
  applyButton = this.page.getByRole('button', { name: 'Apply' });

  constructor(private page: Page) {}

  async getRandomLocation(): Promise<string> {
    await this.setLocationButton.click();
    const count = await this.setLocationDropDownList.count();
    const randomNumber = getRandomNumber(count);
    await this.setLocationDropDownList.nth(randomNumber).click();
    const inputText = await this.setLocationDropDownList.nth(randomNumber).textContent();
    await this.applyButton.click();
    return inputText;
  }
}
