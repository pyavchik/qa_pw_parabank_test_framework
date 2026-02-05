import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page, userId = 0) {
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

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.step(`Fill credentials: ${username}`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
    });
  }

  async clickLogIn(): Promise<void> {
    await this.step('Click Log In button', async () => {
      await this.logInButton.click();
    });
  }

  async clickRegister(): Promise<void> {
    await this.step('Click Register link', async () => {
      await this.registerLink.click();
    });
  }

  async clickForgotLogin(): Promise<void> {
    await this.step('Click Forgot login info link', async () => {
      await this.forgotLoginLink.click();
    });
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillCredentials(username, password);
    await this.clickLogIn();
  }

  async assertLoginFormVisible(): Promise<void> {
    await this.step('Assert login form is visible', async () => {
      await expect(this.usernameInput).toBeVisible();
      await expect(this.logInButton).toBeVisible();
    });
  }

  async assertErrorVisible(): Promise<void> {
    await this.step('Assert error message is visible', async () => {
      const errorHeading = this.page.getByRole('heading', { name: 'Error!' });
      await expect(errorHeading).toBeVisible();
    });
  }

  async assertLoggedIn(): Promise<void> {
    await this.step('Assert user is logged in', async () => {
      const logOutLink = this.page.getByRole('link', { name: 'Log Out' });
      await expect(logOutLink).toBeVisible();
    });
  }

  async assertLoggedOut(): Promise<void> {
    await this.step('Assert user is logged out', async () => {
      await expect(this.logInButton).toBeVisible();
    });
  }
}
