import { test } from '../../_fixtures/fixtures';
import { addSeverity } from '../../../src/common/helpers/allureHelpers';
import { isParabankErrorPage } from '../../../src/common/helpers/parabankHelpers';

test.describe('Account Overview', () => {
  test('should display accounts overview after login', async ({
    page,
    loggedInUser: _loggedInUser,
    accountsOverviewPage,
  }) => {
    addSeverity('critical');

    await test.step('Navigate to accounts overview', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
      // eslint-disable-next-line playwright/no-conditional-in-test -- skip on demo backend error
      if (await isParabankErrorPage(page)) {
        // eslint-disable-next-line playwright/no-skipped-test -- demo site flakiness
        test.skip(true, 'ParaBank demo backend returned error');
      }
    });

    await test.step('Verify accounts overview is displayed', async () => {
      await accountsOverviewPage.assertAccountsOverviewVisible();
      await accountsOverviewPage.assertLoggedIn();
    });
  });

  test('should display account table with accounts', async ({
    page,
    loggedInUser: _loggedInUser,
    accountsOverviewPage,
  }) => {
    addSeverity('critical');

    await test.step('Navigate to accounts overview', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/overview.htm');
      // eslint-disable-next-line playwright/no-conditional-in-test -- skip on demo backend error
      if (await isParabankErrorPage(page)) {
        // eslint-disable-next-line playwright/no-skipped-test -- demo site flakiness
        test.skip(true, 'ParaBank demo backend returned error');
      }
    });

    await test.step('Verify account table is visible', async () => {
      await accountsOverviewPage.assertAccountTableVisible();
    });
  });
});
