import { Page } from '@playwright/test';
import { getRandomNumber } from '@_playwright-src/helpers/randomValue.helper';

export class ThematicAreaView {
  thematicAreaCategory = this.page.getByTestId('checkbox-filter-wrapper-group-app-button');
  categoryItem = this.page.getByTestId('checkbox-wrapper-app-checkbox');
  categoryItemInputName = this.page.getByTestId('checkbox-wrapper-name');
  applyButton = this.page.getByTestId('form-section-app-button-apply-btn');
  thematicAreaSelectedTags = this.page.locator('.form-section__tags__list').getByTestId('simple-tag__name');

  constructor(private page: Page) {}

  async setThematicAreaCategory(): Promise<void> {
    await this.thematicAreaCategory.first().click();
    await this.categoryItem.first().click();
    await this.applyButton.click();
  }

  async setRandomThematicAreaCategory(): Promise<number> {
    let randomSubCategory: number;

    const propsArray = Object.keys(thematicArea);
    const countArray = propsArray.length - 1;
    const randomCategory = propsArray[getRandomNumber(countArray)];
    for (const prop in thematicArea) {
      if (prop === randomCategory) {
        await this.page.getByRole('button', { name: `${randomCategory}` }).click();
        const count = thematicArea[prop].length - 1;
        randomSubCategory = getRandomNumber(count);
        for (let i = 0; i < randomSubCategory; i++) {
          await this.page
            .locator('label')
            .filter({ hasText: `${thematicArea[prop][i]}` })
            .click();
        }
      }
    }
    await this.applyButton.click();
    return randomSubCategory;
  }
}

const thematicArea = {
  'Health': [
    'Medical centers',
    'Medications / Medicines, Facilities and services',
    'Epidemics / Pandemics',
    'COVID',
    'Ebola',
    'HIV / AIDS',
    'Gender Based Violence',
    'Sexual and Reproductive Rights',
    'Mental health',
    'Other',
  ],
  'Food security': ['Livelihoods', 'Livestock', 'Agriculture', 'Locust', 'Other'],
  'WASH': [
    'Handwashing stations',
    'Water points',
    'Latrines',
    'Water trucking',
    'Solid waste / garbage management',
    'Water Facilities and Supplies',
    'Flooding / Heavy rains',
    'Other',
  ],
  'Shelter': [
    'Temporary shelters',
    'Camp Coordination Management',
    'Housing',
    'Lighting and electricity',
    'Construction',
    'Technical support',
    'Other',
  ],
  'Education': ['Early Childhood', 'Primary', 'Secondary', 'University / Colleges / Trades', 'Scholarships', 'Other'],
  'Protection': [
    'Children',
    'Young People',
    'Women',
    'Person with disabilities',
    'Elderlies',
    'LGBTQ+',
    'Chronically ill people',
    'Legal status (refugees)',
    'Indigenous community',
    'Low income families',
    'Internally Displaced People (IDP)',
    'Minority Group',
    'Other',
  ],
  'Governance': ['Elections', 'Finance', 'Civic Space', 'Safety and Security', 'Other'],
  'Cross-cutting': [
    'Logistics',
    'Cash',
    'Telecommunications',
    'Capacity building',
    'Community sensitisation',
    'Aid workers',
    'Climate Change',
    'Environment',
    'Loop Onboarding',
    'DRR and Preparedness',
    'Other',
  ],
};
