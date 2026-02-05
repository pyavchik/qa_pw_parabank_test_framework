import { test as authTest } from './fixturesAuth';
import { AccountsOverviewPage } from '@/ui/pages/AccountsOverviewPage';
import { AccountDetailsPage } from '@/ui/pages/AccountDetailsPage';
import { OpenNewAccountPage } from '@/ui/pages/OpenNewAccountPage';
import { TransferFundsPage } from '@/ui/pages/TransferFundsPage';
import { BillPayPage } from '@/ui/pages/BillPayPage';
import { FindTransactionsPage } from '@/ui/pages/FindTransactionsPage';
import { UpdateContactInfoPage } from '@/ui/pages/UpdateContactInfoPage';
import { RequestLoanPage } from '@/ui/pages/RequestLoanPage';

export const test = authTest.extend<{
  accountsOverviewPage: AccountsOverviewPage;
  accountDetailsPage: AccountDetailsPage;
  openNewAccountPage: OpenNewAccountPage;
  transferFundsPage: TransferFundsPage;
  billPayPage: BillPayPage;
  findTransactionsPage: FindTransactionsPage;
  updateContactInfoPage: UpdateContactInfoPage;
  requestLoanPage: RequestLoanPage;
  loggedInUser: { username: string; password: string; accountIds: string[] };
}>({
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },

  accountDetailsPage: async ({ page }, use) => {
    await use(new AccountDetailsPage(page));
  },

  openNewAccountPage: async ({ page }, use) => {
    await use(new OpenNewAccountPage(page));
  },

  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },

  billPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page));
  },

  findTransactionsPage: async ({ page }, use) => {
    await use(new FindTransactionsPage(page));
  },

  updateContactInfoPage: async ({ page }, use) => {
    await use(new UpdateContactInfoPage(page));
  },

  requestLoanPage: async ({ page }, use) => {
    await use(new RequestLoanPage(page));
  },

  loggedInUser: async (
    { page, registeredUser, loginPage, accountsOverviewPage },
    use,
  ) => {
    const url = page.url();
    const alreadyLoggedIn =
      url.includes('overview') || url.includes('openaccount');
    if (!alreadyLoggedIn) {
      await page.goto('/parabank/index.htm', {
        waitUntil: 'load',
        timeout: 30000,
      });
      const loginForm = page.locator('input[name="username"]');
      if (await loginForm.isVisible().catch(() => false)) {
        await loginPage.login(registeredUser.username, registeredUser.password);
      }
    }
    await page.goto('https://parabank.parasoft.com/parabank/overview.htm', {
      waitUntil: 'load',
      timeout: 30000,
    });
    let accountIds: string[] = [];
    if (page.url().includes('overview')) {
      accountIds = await accountsOverviewPage.getAccountIds();
    }
    await use({
      username: registeredUser.username,
      password: registeredUser.password,
      accountIds,
    });
  },
});

export { expect } from '@playwright/test';
