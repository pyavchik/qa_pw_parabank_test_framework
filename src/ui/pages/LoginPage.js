import { expect, testStep } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
  }

  get usernameInput() {
    return this.page.locator('input[name="username"]');
  }

  get passwordInput() {
    return this.page.locator('input[name="password"]');
  }

  get logInButton() {
    return this.page.getByRole('button', { name: 'Log In' });
  }

  get registerLink() {
    return this.page.getByRole('link', { name: 'Register' });
  }

  get forgotLoginLink() {
    return this.page.getByRole('link', { name: 'Forgot login info?' });
  }

  async fillCredentials(username, password) {
    await this.step(`Fill credentials: ${username}`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
    });
  }

  async clickLogIn() {
    await this.step('Click Log In button', async () => {
      await this.logInButton.click();
    });
  }

  async clickRegister() {
    await this.step('Click Register link', async () => {
      await this.registerLink.click();
    });
  }

  async clickForgotLogin() {
    await this.step('Click Forgot login info link', async () => {
      await this.forgotLoginLink.click();
    });
  }

  async login(username, password) {
    await this.fillCredentials(username, password);
    await this.clickLogIn();
  }

  async assertLoginFormVisible() {
    await this.step('Assert login form is visible', async () => {
      await expect(this.usernameInput).toBeVisible();
      await expect(this.logInButton).toBeVisible();
    });
  }

  async assertErrorVisible() {
    await this.step('Assert error message is visible', async () => {
      await expect(this.page.getByRole('heading', { name: 'Error!' })).toBeVisible();
    });
  }

  async assertLoggedIn() {
    await this.step('Assert user is logged in', async () => {
      await expect(this.page.getByRole('link', { name: 'Log Out' })).toBeVisible();
    });
  }

  async assertLoggedOut() {
    await this.step('Assert user is logged out', async () => {
      await expect(this.logInButton).toBeVisible();
    });
  }
}
