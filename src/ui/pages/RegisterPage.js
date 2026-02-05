import { expect, testStep } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
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

  async fillRegistrationForm(data) {
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
      await this.confirmPasswordInput.fill(data.password);
    });
  }

  async clickRegister() {
    await this.step('Click Register button', async () => {
      await this.registerButton.click();
    });
  }

  async assertWelcomeMessageVisible(username) {
    await this.step(`Assert welcome message or redirect for ${username}`, async () => {
      const welcomeHeading = this.page.getByRole('heading', { name: /Welcome/i });
      const overviewHeading = this.page.getByRole('heading', { name: /Account.*Overview|Accounts/i });
      const userText = this.page.getByText(new RegExp(username));
      await expect(welcomeHeading.or(overviewHeading).or(userText)).toBeVisible({ timeout: 10000 });
    });
  }

  async assertValidationErrorVisible() {
    await this.step('Assert validation error is visible', async () => {
      const error = this.page.locator('.error');
      await expect(error).toBeVisible();
    });
  }

  async assertRegisterFormVisible() {
    await this.step('Assert register form is visible', async () => {
      await expect(this.registerButton).toBeVisible();
      await expect(this.firstNameInput).toBeVisible();
    });
  }
}
