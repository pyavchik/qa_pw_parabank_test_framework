import { expect, testStep } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class RequestLoanPage extends BasePage {
  constructor(page, userId = 0) {
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

  async fillLoanAmount(amount) {
    await this.step(`Fill loan amount: ${amount}`, async () => {
      await this.loanAmountInput.fill(String(amount));
    });
  }

  async fillDownPayment(amount) {
    await this.step(`Fill down payment: ${amount}`, async () => {
      await this.downPaymentInput.fill(String(amount));
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select from account: ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async clickApplyNow() {
    await this.step('Click Apply Now button', async () => {
      await this.applyNowButton.click();
    });
  }

  async requestLoan(loanAmount, downPayment, fromAccountId) {
    await this.fillLoanAmount(loanAmount);
    await this.fillDownPayment(downPayment);
    await this.selectFromAccount(fromAccountId);
    await this.clickApplyNow();
  }

  async assertLoanApproved() {
    await this.step('Assert loan approved', async () => {
      await expect(this.page.getByRole('heading', { name: /Loan Request Processed|Approved/i })).toBeVisible();
    });
  }

  async assertLoanDenied() {
    await this.step('Assert loan denied', async () => {
      await expect(this.page.getByText(/denied|has been denied/i)).toBeVisible();
    });
  }

  async assertRequestLoanFormVisible() {
    await this.step('Assert request loan form visible', async () => {
      await expect(this.applyNowButton).toBeVisible();
    });
  }
}
