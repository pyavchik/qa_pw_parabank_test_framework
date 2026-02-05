import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OpenNewAccountPage extends BasePage {
  constructor(page: Page, userId = 0) {
    super(page, userId);
  }

  get accountTypeSelect() {
    return this.page.locator('#type');
  }

  get fromAccountSelect() {
    return this.page.locator('#fromAccountId');
  }

  get openAccountButton() {
    return this.page.getByRole('button', { name: 'Open New Account' });
  }

  async selectAccountType(type: string): Promise<void> {
    await this.step(`Select account type: ${type}`, async () => {
      await this.accountTypeSelect.selectOption(type);
    });
  }

  async selectFromAccount(accountId: string): Promise<void> {
    await this.step(`Select from account: ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async clickOpenAccount(): Promise<void> {
    await this.step('Click Open New Account button', async () => {
      await this.openAccountButton.click();
    });
  }

  async openAccount(
    accountType: string,
    fromAccountId: string
  ): Promise<void> {
    await this.selectAccountType(accountType);
    await this.selectFromAccount(fromAccountId);
    await this.clickOpenAccount();
  }

  async assertAccountOpenedSuccess(): Promise<void> {
    await this.step('Assert account opened successfully', async () => {
      const heading = this.page.getByRole('heading', {
        name: /Account Opened/i,
      });
      await expect(heading).toBeVisible();
    });
  }

  async assertNewAccountFormVisible(): Promise<void> {
    await this.step('Assert open new account form is visible', async () => {
      await expect(this.openAccountButton).toBeVisible();
    });
  }
}
