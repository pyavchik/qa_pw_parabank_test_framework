import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RequestLoanPage extends BasePage {
  constructor(page: Page, userId = 0) {
    super(page, userId);
  }

  get loanAmountInput() {
    return this.page.locator('input#amount');
  }

  get downPaymentInput() {
    return this.page.locator('input#downPayment');
  }

  get fromAccountSelect() {
    return this.page.locator('#fromAccountId');
  }

  get applyNowButton() {
    return this.page.getByRole('button', { name: 'Apply Now' });
  }

  async fillLoanAmount(amount: number): Promise<void> {
    await this.step(`Fill loan amount: ${amount}`, async () => {
      await this.loanAmountInput.fill(String(amount));
    });
  }

  async fillDownPayment(amount: number): Promise<void> {
    await this.step(`Fill down payment: ${amount}`, async () => {
      await this.downPaymentInput.fill(String(amount));
    });
  }

  async selectFromAccount(accountId: string): Promise<void> {
    await this.step(`Select from account: ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async clickApplyNow(): Promise<void> {
    await this.step('Click Apply Now button', async () => {
      await this.applyNowButton.click();
    });
  }

  async requestLoan(
    loanAmount: number,
    downPayment: number,
    fromAccountId: string
  ): Promise<void> {
    await this.fillLoanAmount(loanAmount);
    await this.fillDownPayment(downPayment);
    await this.selectFromAccount(fromAccountId);
    await this.clickApplyNow();
  }

  async assertLoanApproved(): Promise<void> {
    await this.step('Assert loan approved', async () => {
      const heading = this.page.getByRole('heading', {
        name: /Loan Request Processed|Approved/i,
      });
      await expect(heading).toBeVisible();
    });
  }

  async assertLoanDenied(): Promise<void> {
    await this.step('Assert loan denied', async () => {
      const denied = this.page.getByText(/denied|has been denied/i);
      await expect(denied).toBeVisible();
    });
  }

  async assertRequestLoanFormVisible(): Promise<void> {
    await this.step('Assert request loan form visible', async () => {
      await expect(this.applyNowButton).toBeVisible();
    });
  }
}
