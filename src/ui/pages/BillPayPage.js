import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BillPayPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
  }

  get payeeNameInput() {
    return this.page.locator('input[name="payee.name"]');
  }

  get addressInput() {
    return this.page.locator('input[name="payee.address.street"]');
  }

  get cityInput() {
    return this.page.locator('input[name="payee.address.city"]');
  }

  get stateInput() {
    return this.page.locator('input[name="payee.address.state"]');
  }

  get zipCodeInput() {
    return this.page.locator('input[name="payee.address.zipCode"]');
  }

  get phoneInput() {
    return this.page.locator('input[name="payee.phoneNumber"]');
  }

  get accountInput() {
    return this.page.locator('input[name="payee.accountNumber"]');
  }

  get verifyAccountInput() {
    return this.page.locator('input[name="verifyAccount"]');
  }

  get amountInput() {
    return this.page.locator('input[name="amount"]');
  }

  get fromAccountSelect() {
    return this.page.locator('#fromAccountId');
  }

  get sendPaymentButton() {
    return this.page.getByRole('button', { name: 'Send Payment' });
  }

  async fillPayeeForm(data) {
    await this.step('Fill payee form', async () => {
      await this.payeeNameInput.fill(data.payeeName);
      await this.addressInput.fill(data.address);
      await this.cityInput.fill(data.city);
      await this.stateInput.fill(data.state);
      await this.zipCodeInput.fill(data.zipCode);
      await this.phoneInput.fill(data.phone);
      await this.accountInput.fill(data.accountNumber);
      await this.verifyAccountInput.fill(data.accountNumber);
      await this.amountInput.fill(String(data.amount));
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select from account: ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption({ value: String(accountId) });
    });
  }

  async clickSendPayment() {
    await this.step('Click Send Payment button', async () => {
      await this.sendPaymentButton.click();
    });
  }

  async payBill(payeeData, fromAccountId) {
    await this.fillPayeeForm(payeeData);
    await this.selectFromAccount(fromAccountId);
    await this.clickSendPayment();
  }

  async assertPaymentComplete() {
    await this.step('Assert bill payment complete', async () => {
      const heading = this.page.getByRole('heading', {
        name: /Bill Payment Complete/i,
      });
      await expect(heading).toBeVisible();
    });
  }

  async assertBillPayFormVisible() {
    await this.step('Assert bill pay form is visible', async () => {
      await expect(this.sendPaymentButton).toBeVisible();
    });
  }
}
