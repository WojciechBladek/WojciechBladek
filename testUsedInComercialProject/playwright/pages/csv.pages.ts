import { Page } from '@playwright/test';
import { LoginPage } from './login.pages';

export class CsvPage {
  constructor(private page: Page) {}
  loginPage = new LoginPage(this.page);

  accountRequired = this.page.getByTestId('accountRequired');
  csvModal = this.page.getByTestId('modal-csv');
  csvButtonDownload = this.loginPage.button.nth(1);
  csvModalRejectButton = this.loginPage.button.getByText('cancel');
  csvModalRejectIcon = this.page.getByTestId('modal__close-button').first();
  expectedTextNeedAcount = 'You need an account for that! ';
  applyFreeButton = this.csvModal.getByTestId('button').first();
  applyPremiumButton = this.csvModal.getByTestId('button').last();
  plan = ['free', 'paid'];
}
//data-testid="modal-csv"
