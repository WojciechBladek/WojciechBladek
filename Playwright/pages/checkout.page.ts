import { UserCheckoutData } from '../models/user-checkout.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CheckoutPage extends BasePage {
  url = '/checkout/';

  userFirstName = this.page.locator('#billing_first_name');
  userLastName = this.page.locator('#billing_last_name');
  userStreetAddress = this.page.locator('#billing_address_1');
  userPostCode = this.page.locator('#billing_postcode');
  userTownCity = this.page.locator('#billing_city');
  userPhone = this.page.locator('#billing_phone');

  placeOrderButton = this.page.locator('#place_order');
  errorMessage = this.page.locator(
    '#post-7 > div.woocommerce > form.checkout.woocommerce-checkout > div.woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout > div',
  );

  constructor(page: Page) {
    super(page);
  }

  async fillOutTheForm(userFormData: UserCheckoutData): Promise<void> {
    await this.userFirstName.type(userFormData.userFirstName, { delay: 10 });
    await this.userLastName.type(userFormData.userLastName, { delay: 10 });
    await this.userStreetAddress.type(userFormData.userStreetAddress, {
      delay: 10,
    });
    await this.userPostCode.type(userFormData.userPostCode, { delay: 10 });
    await this.userTownCity.type(userFormData.userTownCity, { delay: 10 });
    await this.userPhone.type(userFormData.userPhone, { delay: 10 });
  }
}
