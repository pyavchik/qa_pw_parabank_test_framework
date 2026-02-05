import { expect, testStep } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class UpdateContactInfoPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
  }

  get firstNameInput() {
    return this.page.locator('input[name="customer.firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('input[name="customer.lastName"]');
  }

  get addressInput() {
    return this.page.locator('input[name="customer.address.street"]');
  }

  get cityInput() {
    return this.page.locator('input[name="customer.address.city"]');
  }

  get stateInput() {
    return this.page.locator('input[name="customer.address.state"]');
  }

  get zipCodeInput() {
    return this.page.locator('input[name="customer.address.zipCode"]');
  }

  get phoneInput() {
    return this.page.locator('input[name="customer.phoneNumber"]');
  }

  get updateProfileButton() {
    return this.page.getByRole('button', { name: 'Update Profile' });
  }

  async updateContactInfo(data) {
    await this.step('Update contact info', async () => {
      if (data.firstName) await this.firstNameInput.fill(data.firstName);
      if (data.lastName) await this.lastNameInput.fill(data.lastName);
      if (data.address) await this.addressInput.fill(data.address);
      if (data.city) await this.cityInput.fill(data.city);
      if (data.state) await this.stateInput.fill(data.state);
      if (data.zipCode) await this.zipCodeInput.fill(data.zipCode);
      if (data.phone) await this.phoneInput.fill(data.phone);
    });
  }

  async clickUpdateProfile() {
    await this.step('Click Update Profile button', async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertProfileUpdated() {
    await this.step('Assert profile updated', async () => {
      await expect(this.page.getByRole('heading', { name: /Profile Updated/i })).toBeVisible();
    });
  }

  async assertUpdateProfileFormVisible() {
    await this.step('Assert update profile form visible', async () => {
      await expect(this.updateProfileButton).toBeVisible();
    });
  }
}
