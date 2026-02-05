import { test, expect } from '../../_fixtures/fixtures';
import { addSeverity } from '../../../src/common/helpers/allureHelpers';

test.describe('Log Out', () => {
  test('should log out successfully', async ({
    page,
    loginPage,
    accountsOverviewPage,
    loggedInUser: _loggedInUser,
  }) => {
    addSeverity('critical');

    await test.step('Ensure user is logged in', async () => {
      await page.goto('/parabank/overview.htm');
      await accountsOverviewPage.assertLoggedIn();
    });

    await test.step('Click Log Out', async () => {
      await accountsOverviewPage.clickLogOut();
    });

    await test.step('Verify user is logged out', async () => {
      await loginPage.assertLoggedOut();
      await expect(page).toHaveURL(/index|login/);
    });
  });
});
