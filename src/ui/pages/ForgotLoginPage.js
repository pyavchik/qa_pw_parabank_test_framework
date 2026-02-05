import { expect, testStep } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class ForgotLoginPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
  }

  get firstNameInput() {
    return this.page.locator('input[name="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('input[name="lastName"]');
  }

  get addressInput() {
    return this.page.locator('input[name="address.street"]');
  }

  get cityInput() {
    return this.page.locator('input[name="address.city"]');
  }

  get stateInput() {
    return this.page.locator('input[name="address.state"]');
  }

  get zipCodeInput() {
    return this.page.locator('input[name="address.zipCode"]');
  }

  get ssnInput() {
    return this.page.locator('input[name="ssn"]');
  }

  get findLoginInfoButton() {
    return this.page.getByRole('button', { name: 'Find My Login Info' });
  }

  async fillLookupForm(data) {
    await this.step('Fill lookup form', async () => {
      await this.firstNameInput.fill(data.firstName);
      await this.lastNameInput.fill(data.lastName);
      await this.addressInput.fill(data.address);
      await this.cityInput.fill(data.city);
      await this.stateInput.fill(data.state);
      await this.zipCodeInput.fill(data.zipCode);
      await this.ssnInput.fill(data.ssn);
    });
  }

  async clickFindLoginInfo() {
    await this.step('Click Find My Login Info button', async () => {
      await this.findLoginInfoButton.click();
    });
  }

  async assertLookupFormVisible() {
    await this.step('Assert lookup form is visible', async () => {
      await expect(this.page.getByRole('heading', { name: 'Customer Lookup' })).toBeVisible();
      await expect(this.findLoginInfoButton).toBeVisible();
    });
  }

  async assertUsernameRetrieved(username) {
    await this.step(`Assert username ${username} is displayed`, async () => {
      await expect(this.page.getByText(new RegExp(`Username:.*${username}`, 'i'))).toBeVisible();
    });
  }

  async assertErrorVisible() {
    await this.step('Assert error message is visible', async () => {
      const error = this.page.locator('.error');
      await expect(error).toBeVisible();
    });
  }
}
