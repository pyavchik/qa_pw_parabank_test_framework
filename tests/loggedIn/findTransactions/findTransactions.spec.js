import { test, expect } from '../../_fixtures/fixtures';
import { addSeverity } from '../../../src/common/helpers/allureHelpers';
import { isParabankErrorPage } from '../../../src/common/helpers/parabankHelpers';

test.describe('Find Transactions', () => {
  test('should display find transactions form', async ({
    page,
    loggedInUser,
    findTransactionsPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to find transactions page', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/findtrans.htm');
      if (await isParabankErrorPage(page)) {
        test.skip(true, 'ParaBank demo backend returned error');
      }
    });

    await test.step('Verify find transactions form is visible', async () => {
      await findTransactionsPage.assertFindTransactionsFormVisible();
    });
  });

  test('should find transactions by amount', async ({
    page,
    loggedInUser,
    findTransactionsPage,
  }) => {
    addSeverity('critical');

    const accountIds = loggedInUser.accountIds;
    test.skip(accountIds.length === 0, 'No accounts available');

    await test.step('Navigate to find transactions page', async () => {
      await page.goto('/parabank/findtrans.htm');
    });

    await test.step('Search by amount', async () => {
      await findTransactionsPage.findByAmount(accountIds[0], 100);
    });

    await test.step('Verify results or no results message', async () => {
      await expect(page.locator('#transactionTable, .ng-scope')).toBeVisible();
    });
  });
});
