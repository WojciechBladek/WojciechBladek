import { Page } from '@playwright/test';
import { getRandomNumber } from '@_playwright-src/helpers/randomValue.helper';

export class SetOrganizationView {
  openOrganizationDropdownButton = this.page.getByRole('main').locator('app-expand-more-icon').getByRole('img');
  organizationItemList = this.page.locator('.select-option');

  constructor(private page: Page) {}

  async selectRandomOrganization(): Promise<string> {
    await this.openOrganizationDropdownButton.click();
    const count = await this.organizationItemList.count();
    const randomNumber = getRandomNumber(count);
    const inputText = await this.organizationItemList.nth(randomNumber).textContent();
    await this.organizationItemList.nth(randomNumber).click();
    return inputText;
  }
}
