import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import type { LookupData } from '../../common/helpers/userDataHelper';

export class ForgotLoginPage extends BasePage {
  constructor(page: Page, userId = 0) {
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

  async fillLookupForm(data: LookupData): Promise<void> {
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

  async clickFindLoginInfo(): Promise<void> {
    await this.step('Click Find My Login Info button', async () => {
      await this.findLoginInfoButton.click();
    });
  }

  async assertLookupFormVisible(): Promise<void> {
    await this.step('Assert lookup form is visible', async () => {
      const heading = this.page.getByRole('heading', {
        name: 'Customer Lookup',
      });
      await expect(heading).toBeVisible();
      await expect(this.findLoginInfoButton).toBeVisible();
    });
  }

  async assertUsernameRetrieved(username: string): Promise<void> {
    const msg = `Assert username ${username} is displayed`;
    await this.step(msg, async () => {
      const pattern = new RegExp(`Username:.*${username}`, 'i');
      await expect(this.page.getByText(pattern)).toBeVisible();
    });
  }

  async assertErrorVisible(): Promise<void> {
    await this.step('Assert error message is visible', async () => {
      const error = this.page.locator('.error');
      await expect(error).toBeVisible();
    });
  }
}
