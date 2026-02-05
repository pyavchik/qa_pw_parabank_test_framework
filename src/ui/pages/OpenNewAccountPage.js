import { expect, testStep } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class OpenNewAccountPage extends BasePage {
  constructor(page, userId = 0) {
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

  async selectAccountType(type) {
    await this.step(`Select account type: ${type}`, async () => {
      await this.accountTypeSelect.selectOption(type);
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select from account: ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async clickOpenAccount() {
    await this.step('Click Open New Account button', async () => {
      await this.openAccountButton.click();
    });
  }

  async openAccount(accountType, fromAccountId) {
    await this.selectAccountType(accountType);
    await this.selectFromAccount(fromAccountId);
    await this.clickOpenAccount();
  }

  async assertAccountOpenedSuccess() {
    await this.step('Assert account opened successfully', async () => {
      await expect(this.page.getByRole('heading', { name: /Account Opened/i })).toBeVisible();
    });
  }

  async assertNewAccountFormVisible() {
    await this.step('Assert open new account form is visible', async () => {
      await expect(this.openAccountButton).toBeVisible();
    });
  }
}
