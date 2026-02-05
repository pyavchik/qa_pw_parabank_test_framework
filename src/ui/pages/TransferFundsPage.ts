import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {
  constructor(page: Page, userId = 0) {
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

  async fillAmount(amount: number): Promise<void> {
    await this.step(`Fill amount: ${amount}`, async () => {
      await this.amountInput.fill(String(amount));
    });
  }

  async selectFromAccount(accountId: string): Promise<void> {
    await this.step(`Select from account: ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async selectToAccount(accountId: string): Promise<void> {
    await this.step(`Select to account: ${accountId}`, async () => {
      await this.toAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async clickTransfer(): Promise<void> {
    await this.step('Click Transfer button', async () => {
      await this.transferButton.click();
    });
  }

  async transferFunds(
    fromAccountId: string,
    toAccountId: string,
    amount: number
  ): Promise<void> {
    await this.selectFromAccount(fromAccountId);
    await this.selectToAccount(toAccountId);
    await this.fillAmount(amount);
    await this.clickTransfer();
  }

  async assertTransferComplete(): Promise<void> {
    await this.step('Assert transfer completed', async () => {
      const heading = this.page.getByRole('heading', {
        name: /Transfer Complete/i,
      });
      await expect(heading).toBeVisible();
    });
  }

  async assertTransferFormVisible(): Promise<void> {
    await this.step('Assert transfer form is visible', async () => {
      await expect(this.transferButton).toBeVisible();
    });
  }
}
