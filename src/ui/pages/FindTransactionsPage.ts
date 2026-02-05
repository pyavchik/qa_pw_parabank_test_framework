import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FindTransactionsPage extends BasePage {
  constructor(page: Page, userId = 0) {
    super(page, userId);
  }

  get accountSelect() {
    return this.page.locator('#accountId');
  }

  get transactionIdInput() {
    return this.page.locator('#criteria\\.transactionId');
  }

  get findByDateFromInput() {
    return this.page.locator('#criteria\\.fromDate');
  }

  get findByDateToInput() {
    return this.page.locator('#criteria\\.toDate');
  }

  get amountInput() {
    return this.page.locator('#criteria\\.amount');
  }

  get findTransactionsButton() {
    return this.page.getByRole('button', { name: 'Find Transactions' });
  }

  get transactionResults() {
    return this.page.locator('#transactionTable');
  }

  async selectAccount(accountId: string): Promise<void> {
    await this.step(`Select account: ${accountId}`, async () => {
      await this.accountSelect.selectOption({ value: String(accountId) });
    });
  }

  async fillTransactionId(id: string): Promise<void> {
    await this.step(`Fill transaction ID: ${id}`, async () => {
      await this.transactionIdInput.fill(String(id));
    });
  }

  async fillDateRange(fromDate: string, toDate: string): Promise<void> {
    await this.step('Fill date range', async () => {
      await this.findByDateFromInput.fill(fromDate);
      await this.findByDateToInput.fill(toDate);
    });
  }

  async fillAmount(amount: number): Promise<void> {
    await this.step(`Fill amount: ${amount}`, async () => {
      await this.amountInput.fill(String(amount));
    });
  }

  async clickFindTransactions(): Promise<void> {
    await this.step('Click Find Transactions button', async () => {
      await this.findTransactionsButton.click();
    });
  }

  async findById(
    accountId: string,
    transactionId: string
  ): Promise<void> {
    await this.selectAccount(accountId);
    await this.fillTransactionId(transactionId);
    await this.clickFindTransactions();
  }

  async findByAmount(accountId: string, amount: number): Promise<void> {
    await this.selectAccount(accountId);
    await this.fillAmount(amount);
    await this.clickFindTransactions();
  }

  async assertTransactionResultsVisible(): Promise<void> {
    await this.step('Assert transaction results visible', async () => {
      await expect(this.transactionResults).toBeVisible();
    });
  }

  async assertFindTransactionsFormVisible(): Promise<void> {
    await this.step('Assert find transactions form visible', async () => {
      await expect(this.findTransactionsButton).toBeVisible();
    });
  }
}
