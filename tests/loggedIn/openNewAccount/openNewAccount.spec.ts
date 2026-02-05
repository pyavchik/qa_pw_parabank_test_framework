import { test } from '../../_fixtures/fixtures';
import { addSeverity } from '@/common/helpers/allureHelpers';

test.describe('Open New Account', () => {
  test('should open new savings account', async ({
    page,
    loggedInUser,
    openNewAccountPage,
  }) => {
    addSeverity('critical');

    const accountIds = loggedInUser.accountIds;
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(accountIds.length === 0, 'No accounts available for funding');

    await test.step('Navigate to open new account page', async () => {
      await page.goto('/parabank/openaccount.htm');
    });

    await test.step('Open new savings account', async () => {
      await openNewAccountPage.openAccount('1', accountIds[0]);
    });

    await test.step('Verify account opened successfully', async () => {
      await openNewAccountPage.assertAccountOpenedSuccess();
    });
  });

  test('should open new checking account', async ({
    page,
    loggedInUser,
    openNewAccountPage,
  }) => {
    addSeverity('critical');

    const accountIds = loggedInUser.accountIds;
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(accountIds.length === 0, 'No accounts available for funding');

    await test.step('Navigate to open new account page', async () => {
      await page.goto('/parabank/openaccount.htm');
    });

    await test.step('Open new checking account', async () => {
      await openNewAccountPage.openAccount('0', accountIds[0]);
    });

    await test.step('Verify account opened successfully', async () => {
      await openNewAccountPage.assertAccountOpenedSuccess();
    });
  });
});
