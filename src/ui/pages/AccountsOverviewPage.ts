import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountsOverviewPage extends BasePage {
  constructor(page: Page, userId = 0) {
    super(page, userId);
  }

  get accountTable() {
    return this.page.locator('#accountTable');
  }

  get accountLinks() {
    return this.page.locator('#accountTable tbody tr td a');
  }

  get logOutLink() {
    return this.page.getByRole('link', { name: 'Log Out' });
  }

  get openNewAccountLink() {
    return this.page.getByRole('link', { name: 'Open New Account' });
  }

  get transferFundsLink() {
    return this.page.getByRole('link', { name: 'Transfer Funds' });
  }

  get billPayLink() {
    return this.page.getByRole('link', { name: 'Bill Pay' });
  }

  get findTransactionsLink() {
    return this.page.getByRole('link', { name: 'Find Transactions' });
  }

  get updateContactInfoLink() {
    return this.page.getByRole('link', { name: 'Update Contact Info' });
  }

  get requestLoanLink() {
    return this.page.getByRole('link', { name: 'Request Loan' });
  }

  get accountsOverviewLink() {
    const name = /Accounts Overview|Account Services/i;
    return this.page.getByRole('link', { name });
  }

  async clickAccountLink(accountId: string): Promise<void> {
    await this.step(`Click account link for ${accountId}`, async () => {
      const selector = '#accountTable tbody tr td:nth-child(1) a';
      const link = this.page.locator(selector).first();
      await link.click();
    });
  }

  async clickLogOut(): Promise<void> {
    await this.step('Click Log Out', async () => {
      await this.logOutLink.click();
    });
  }

  async assertAccountsOverviewVisible(): Promise<void> {
    await this.step('Assert Accounts Overview is visible', async () => {
      const re = /Account.*Overview|Accounts Overview|Account Services/i;
      const heading = this.page.getByRole('heading', { name: re });
      await expect(heading).toBeVisible({ timeout: 8000 });
    });
  }

  async assertAccountTableVisible(): Promise<void> {
    await this.step('Assert account table is visible', async () => {
      await expect(this.accountTable).toBeVisible({ timeout: 8000 });
    });
  }

  async assertLoggedIn(): Promise<void> {
    await this.step('Assert user is logged in', async () => {
      await expect(this.logOutLink).toBeVisible();
    });
  }

  async getAccountIds(): Promise<string[]> {
    const selector = '#accountTable a[href*="activity"]';
    const links = await this.page.locator(selector).all();
    const ids: string[] = [];
    for (const link of links) {
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      const idMatch = href && href.match(/id=(\d+)/);
      if (idMatch) {
        ids.push(idMatch[1]);
      } else if (text && text.trim() && /^\d+$/.test(text.trim())) {
        ids.push(text.trim());
      }
    }
    return ids;
  }
}
