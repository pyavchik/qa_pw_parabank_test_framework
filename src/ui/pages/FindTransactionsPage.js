import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FindTransactionsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
  }

  get accountSelect() {
    return this.page.locator('#accountId');
  }

  get findByDateInput() {
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

  async selectAccount(accountId) {
    await this.step(`Select account: ${accountId}`, async () => {
      await this.accountSelect.selectOption({ value: String(accountId) });
    });
  }

  async fillTransactionId(id) {
    await this.step(`Fill transaction ID: ${id}`, async () => {
      await this.findByDateInput.fill(String(id));
    });
  }

  async fillDateRange(fromDate, toDate) {
    await this.step('Fill date range', async () => {
      await this.findByDateFromInput.fill(fromDate);
      await this.findByDateToInput.fill(toDate);
    });
  }

  async fillAmount(amount) {
    await this.step(`Fill amount: ${amount}`, async () => {
      await this.amountInput.fill(String(amount));
    });
  }

  async clickFindTransactions() {
    await this.step('Click Find Transactions button', async () => {
      await this.findTransactionsButton.click();
    });
  }

  async findById(accountId, transactionId) {
    await this.selectAccount(accountId);
    await this.fillTransactionId(transactionId);
    await this.clickFindTransactions();
  }

  async findByAmount(accountId, amount) {
    await this.selectAccount(accountId);
    await this.fillAmount(amount);
    await this.clickFindTransactions();
  }

  async assertTransactionResultsVisible() {
    await this.step('Assert transaction results visible', async () => {
      await expect(this.transactionResults).toBeVisible();
    });
  }

  async assertFindTransactionsFormVisible() {
    await this.step('Assert find transactions form visible', async () => {
      await expect(this.findTransactionsButton).toBeVisible();
    });
  }
}
