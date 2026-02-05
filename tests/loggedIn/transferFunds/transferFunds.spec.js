import { test } from '../../_fixtures/fixtures';
import { addSeverity } from '../../../src/common/helpers/allureHelpers';
import { isParabankErrorPage } from '../../../src/common/helpers/parabankHelpers';

test.describe('Transfer Funds', () => {
  test('should transfer funds between accounts', async ({
    page,
    loggedInUser,
    transferFundsPage,
  }) => {
    addSeverity('critical');

    const accountIds = loggedInUser.accountIds;
    // eslint-disable-next-line playwright/no-skipped-test -- skip when insufficient accounts
    test.skip(accountIds.length < 2, 'Need at least 2 accounts for transfer');

    await test.step('Navigate to transfer funds page', async () => {
      await page.goto('/parabank/transfer.htm');
    });

    await test.step('Transfer funds between accounts', async () => {
      await transferFundsPage.transferFunds(accountIds[0], accountIds[1], 50);
    });

    await test.step('Verify transfer completed', async () => {
      await transferFundsPage.assertTransferComplete();
    });
  });

  for (const amount of [10, 100, 500]) {
    test(`should transfer valid amount ${amount}`, async ({
      page,
      loggedInUser,
      transferFundsPage,
    }) => {
      addSeverity('normal');

      const accountIds = loggedInUser.accountIds;
      test.skip(accountIds.length < 2, 'Need at least 2 accounts for transfer');

      await test.step('Navigate to transfer funds page', async () => {
        await page.goto('/parabank/transfer.htm');
      });

      await test.step(`Transfer $${amount} between accounts`, async () => {
        await transferFundsPage.transferFunds(accountIds[0], accountIds[1], amount);
      });

      await test.step('Verify transfer completed', async () => {
        await transferFundsPage.assertTransferComplete();
      });
    });
  }

  test('should display transfer form', async ({
    page,
    loggedInUser: _loggedInUser,
    transferFundsPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to transfer funds page', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/transfer.htm');
      // eslint-disable-next-line playwright/no-conditional-in-test -- skip on demo backend error
      if (await isParabankErrorPage(page)) {
        // eslint-disable-next-line playwright/no-skipped-test -- demo site flakiness
        test.skip(true, 'ParaBank demo backend returned error');
      }
    });

    await test.step('Verify transfer form is visible', async () => {
      await transferFundsPage.assertTransferFormVisible();
    });
  });
});
