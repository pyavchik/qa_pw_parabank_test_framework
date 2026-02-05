import { test } from '../../_fixtures/fixtures';
import { addSeverity } from '../../../src/common/helpers/allureHelpers';

test.describe('Account Details & Activity Filtering', () => {
  test('should display account details when clicking account link', async ({
    page,
    loggedInUser,
    accountsOverviewPage,
    accountDetailsPage,
  }) => {
    addSeverity('critical');

    const accountIds = loggedInUser.accountIds;
    // eslint-disable-next-line playwright/no-skipped-test -- skip when no accounts available
    test.skip(accountIds.length === 0, 'No accounts available');

    await test.step('Navigate to accounts overview', async () => {
      await page.goto('/parabank/overview.htm');
    });

    await test.step('Click first account link', async () => {
      await accountsOverviewPage.clickAccountLink(accountIds[0]);
      await page.waitForURL(/activity\.htm/, { timeout: 5000 }).catch(() => {});
    });

    await test.step('Verify account details are displayed', async () => {
      await accountDetailsPage.assertAccountDetailsVisible();
      await accountDetailsPage.assertActivityTableVisible();
    });
  });

  test('should filter account activity by date range', async ({
    page,
    loggedInUser,
    accountsOverviewPage,
    accountDetailsPage,
  }) => {
    addSeverity('normal');

    const accountIds = loggedInUser.accountIds;
    // eslint-disable-next-line playwright/no-skipped-test -- skip when no accounts available
    test.skip(accountIds.length === 0, 'No accounts available');

    await test.step('Navigate to account details', async () => {
      await page.goto('/parabank/overview.htm');
      await accountsOverviewPage.clickAccountLink(accountIds[0]);
    });

    await test.step('Filter activity by period', async () => {
      await accountDetailsPage.filterActivity('January', 'All');
    });

    await test.step('Verify activity table is displayed', async () => {
      await accountDetailsPage.assertActivityTableVisible();
    });
  });
});
