import { test, expect } from '../../_fixtures/fixtures';
import { addSeverity } from '../../../src/common/helpers/allureHelpers';

test.describe('Sign In', () => {
  test('should successfully sign in with valid credentials', async ({
    page,
    loginPage,
    registeredUser,
  }) => {
    addSeverity('critical');

    await test.step('Navigate to login page and sign in', async () => {
      const indexUrl = '/parabank/index.htm';
      await page.goto(indexUrl, { waitUntil: 'load' });
      const usernameLocator = page.locator('input[name="username"]');
      const loginVisible = await usernameLocator.isVisible().catch(() => false);
      // eslint-disable-next-line playwright/no-conditional-in-test
      if (loginVisible) {
        await loginPage.login(registeredUser.username, registeredUser.password);
      }
    });

    await test.step('Verify user is logged in', async () => {
      const logOutLocator = page.getByRole('link', { name: 'Log Out' });
      const logOutVisible = await logOutLocator.isVisible().catch(() => false);
      const onOverview = page.url().includes('overview');
      // eslint-disable-next-line playwright/no-conditional-in-test
      const loggedIn = logOutVisible || onOverview;
      const msg = 'User should be logged in';
      expect(loggedIn, msg).toBeTruthy();
    });
  });

  test('should show error when signing in with invalid username', async ({
    page,
    loginPage,
  }) => {
    addSeverity('critical');

    await test.step('Navigate to login page', async () => {
      await page.goto('/parabank/index.htm', { waitUntil: 'load' });
    });

    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login('nonexistent_user_xyz', 'wrongpassword');
    });

    await test.step('Verify error is displayed', async () => {
      const errorHeading = page.getByRole('heading', { name: 'Error!' });
      await expect(errorHeading).toBeVisible();
    });
  });

  test('should show error when signing in with invalid password', async ({
    page,
    loginPage,
    registeredUser,
  }) => {
    addSeverity('critical');

    await test.step('Ensure logged out and go to login page', async () => {
      await page.goto('/parabank/logout.htm');
      await page.goto('/parabank/index.htm', { waitUntil: 'load' });
    });

    await test.step('Attempt login with wrong password', async () => {
      const { username } = registeredUser;
      await loginPage.login(username, 'WrongPassword123!');
    });

    await test.step('Verify error is displayed', async () => {
      const errorHeading = page.getByRole('heading', { name: 'Error!' });
      await expect(errorHeading).toBeVisible();
    });
  });

  test('should show error when signing in with empty credentials', async ({
    page,
    loginPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to login page', async () => {
      await page.goto('/parabank/index.htm', { waitUntil: 'load' });
    });

    await test.step('Click Log In without entering credentials', async () => {
      await loginPage.clickLogIn();
    });

    await test.step('Verify login form remains visible', async () => {
      await loginPage.assertLoginFormVisible();
    });
  });
});
