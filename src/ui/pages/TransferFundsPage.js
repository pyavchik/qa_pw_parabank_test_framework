import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
  }

  get amountInput() {
    return this.page.locator('#amount');
  }

  get fromAccountSelect() {
    return this.page.locator('#fromAccountId');
  }

  get toAccountSelect() {
    return this.page.locator('#toAccountId');
  }

  get transferButton() {
    return this.page.getByRole('button', { name: 'Transfer' });
  }

  async fillAmount(amount) {
    await this.step(`Fill amount: ${amount}`, async () => {
      await this.amountInput.fill(String(amount));
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select from account: ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async selectToAccount(accountId) {
    await this.step(`Select to account: ${accountId}`, async () => {
      await this.toAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async clickTransfer() {
    await this.step('Click Transfer button', async () => {
      await this.transferButton.click();
    });
  }

  async transferFunds(fromAccountId, toAccountId, amount) {
    await this.selectFromAccount(fromAccountId);
    await this.selectToAccount(toAccountId);
    await this.fillAmount(amount);
    await this.clickTransfer();
  }

  async assertTransferComplete() {
    await this.step('Assert transfer completed', async () => {
      const heading = this.page.getByRole('heading', {
        name: /Transfer Complete/i,
      });
      await expect(heading).toBeVisible();
    });
  }

  async assertTransferFormVisible() {
    await this.step('Assert transfer form is visible', async () => {
      await expect(this.transferButton).toBeVisible();
    });
  }
}
