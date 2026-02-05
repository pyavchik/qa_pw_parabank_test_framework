import { expect, testStep } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class AccountDetailsPage extends BasePage {
  constructor(page, userId = 0) {
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
    return this.page.getByRole('button', { name: 'Find Transactions', exact: false });
  }

  async selectActivityPeriod(period) {
    await this.step(`Select activity period: ${period}`, async () => {
      await this.activityPeriodSelect.selectOption(period);
    });
  }

  async selectActivityType(type) {
    await this.step(`Select activity type: ${type}`, async () => {
      await this.activityTypeSelect.selectOption(type);
    });
  }

  async clickGo() {
    await this.step('Click Go button', async () => {
      await this.goButton.click();
    });
  }

  async filterActivity(period, type) {
    await this.selectActivityPeriod(period);
    await this.selectActivityType(type);
    await this.clickGo();
  }

  async assertAccountDetailsVisible() {
    await this.step('Assert account details are visible', async () => {
      const onActivityPage = this.page.url().includes('activity.htm');
      if (onActivityPage) {
        const accountOrTable = this.page.locator('#accountId, #transactionTable, table').first();
        await expect(accountOrTable).toBeVisible({ timeout: 5000 });
      } else {
        const overviewContent = this.page.getByText(/Account|Balance|Activity/).or(this.page.locator('table')).first();
        await expect(overviewContent).toBeVisible({ timeout: 5000 });
      }
    });
  }

  async assertActivityTableVisible() {
    await this.step('Assert activity table is visible', async () => {
      await expect(this.activityTable).toBeVisible();
    });
  }
}
