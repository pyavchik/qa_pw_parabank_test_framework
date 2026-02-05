import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountDetailsPage extends BasePage {
  constructor(page: Page, userId = 0) {
    super(page, userId);
  }

  get accountId() {
    return this.page.locator('#accountId, .ng-scope b').first();
  }

  get accountType() {
    return this.page.locator('#accountType, td.ng-binding').first();
  }

  get balance() {
    return this.page.locator('#balance, [id*="balance"]').first();
  }

  get availableBalance() {
    return this.page.locator('#availableBalance, [id*="balance"]').first();
  }

  get activityTable() {
    return this.page.locator('#transactionTable, table.table');
  }

  get activityPeriodSelect() {
    return this.page.locator('#month');
  }

  get activityTypeSelect() {
    return this.page.locator('#transactionType');
  }

  get goButton() {
    const opts = { name: 'Find Transactions', exact: false };
    return this.page.getByRole('button', opts);
  }

  async selectActivityPeriod(period: string): Promise<void> {
    const msg = `Select activity period: ${period}`;
    await this.step(msg, async () => {
      await this.activityPeriodSelect.selectOption(period);
    });
  }

  async selectActivityType(type: string): Promise<void> {
    await this.step(`Select activity type: ${type}`, async () => {
      await this.activityTypeSelect.selectOption(type);
    });
  }

  async clickGo(): Promise<void> {
    await this.step('Click Go button', async () => {
      await this.goButton.click();
    });
  }

  async filterActivity(period: string, type: string): Promise<void> {
    await this.selectActivityPeriod(period);
    await this.selectActivityType(type);
    await this.clickGo();
  }

  async assertAccountDetailsVisible(): Promise<void> {
    await this.step('Assert account details are visible', async () => {
      const onActivityPage = this.page.url().includes('activity.htm');
      if (onActivityPage) {
        const sel = '#accountId, #transactionTable, table';
        const accountOrTable = this.page.locator(sel).first();
        await expect(accountOrTable).toBeVisible({ timeout: 5000 });
      } else {
        const text = this.page.getByText(/Account|Balance|Activity/);
        const table = this.page.locator('table');
        const overviewContent = text.or(table).first();
        await expect(overviewContent).toBeVisible({ timeout: 5000 });
      }
    });
  }

  async assertActivityTableVisible(): Promise<void> {
    await this.step('Assert activity table is visible', async () => {
      await expect(this.activityTable).toBeVisible();
    });
  }
}
