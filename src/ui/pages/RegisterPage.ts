import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import type { RegistrationData } from '@/common/helpers/userDataHelper';

export class RegisterPage extends BasePage {
  constructor(page: Page, userId = 0) {
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

  get ssnInput() {
    return this.page.locator('input[name="customer.ssn"]');
  }

  get usernameInput() {
    return this.page.locator('input[name="customer.username"]');
  }

  get passwordInput() {
    return this.page.locator('input[name="customer.password"]');
  }

  get confirmPasswordInput() {
    return this.page.locator('input[name="repeatedPassword"]');
  }

  get registerButton() {
    return this.page.getByRole('button', { name: 'Register' });
  }

  async fillRegistrationForm(
    data: RegistrationData,
    options?: { confirmPassword?: string }
  ): Promise<void> {
    const confirmPassword = options?.confirmPassword ?? data.password;
    await this.step('Fill registration form', async () => {
      await this.firstNameInput.fill(data.firstName);
      await this.lastNameInput.fill(data.lastName);
      await this.addressInput.fill(data.address);
      await this.cityInput.fill(data.city);
      await this.stateInput.fill(data.state);
      await this.zipCodeInput.fill(data.zipCode);
      await this.phoneInput.fill(data.phone);
      await this.ssnInput.fill(data.ssn);
      await this.usernameInput.fill(data.username);
      await this.passwordInput.fill(data.password);
      await this.confirmPasswordInput.fill(confirmPassword);
    });
  }

  async clickRegister(): Promise<void> {
    await this.step('Click Register button', async () => {
      await this.registerButton.click();
    });
  }

  async assertWelcomeMessageVisible(username: string): Promise<void> {
    const msg = `Assert welcome message or redirect for ${username}`;
    await this.step(msg, async () => {
      const welcomeHeading = this.page.getByRole('heading', {
        name: /Welcome/i,
      });
      const overviewHeading = this.page.getByRole('heading', {
        name: /Account.*Overview|Accounts/i,
      });
      const userText = this.page.getByText(new RegExp(username));
      const combined = welcomeHeading.or(overviewHeading).or(userText);
      await expect(combined).toBeVisible({ timeout: 10000 });
    });
  }

  async assertValidationErrorVisible(): Promise<void> {
    await this.step('Assert validation error is visible', async () => {
      const error = this.page.locator('.error');
      await expect(error).toBeVisible();
    });
  }

  async assertRegisterFormVisible(): Promise<void> {
    await this.step('Assert register form is visible', async () => {
      await expect(this.registerButton).toBeVisible();
      await expect(this.firstNameInput).toBeVisible();
    });
  }
}
