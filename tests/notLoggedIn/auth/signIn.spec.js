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
      await page.goto('https://parabank.parasoft.com/parabank/index.htm', { waitUntil: 'load' });
      const loginVisible = await page.locator('input[name="username"]').isVisible().catch(() => false);
      if (loginVisible) {
        await loginPage.login(registeredUser.username, registeredUser.password);
      }
    });

    await test.step('Verify user is logged in', async () => {
      const logOutVisible = await page.getByRole('link', { name: 'Log Out' }).isVisible().catch(() => false);
      const onOverview = page.url().includes('overview');
      expect(logOutVisible || onOverview, 'User should be logged in (Log Out visible or on overview)').toBeTruthy();
    });
  });

  test('should show error when signing in with invalid username', async ({
    page,
    loginPage,
  }) => {
    addSeverity('critical');

    await test.step('Navigate to login page', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/index.htm', { waitUntil: 'load' });
    });

    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login('nonexistent_user_xyz', 'wrongpassword');
    });

    await test.step('Verify error is displayed', async () => {
      await expect(page.getByRole('heading', { name: 'Error!' })).toBeVisible();
    });
  });

  test('should show error when signing in with invalid password', async ({
    page,
    loginPage,
    registeredUser,
  }) => {
    addSeverity('critical');

    await test.step('Ensure logged out and navigate to login page', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/logout.htm');
      await page.goto('https://parabank.parasoft.com/parabank/index.htm', { waitUntil: 'load' });
    });

    await test.step('Attempt login with wrong password', async () => {
      await loginPage.login(registeredUser.username, 'WrongPassword123!');
    });

    await test.step('Verify error is displayed', async () => {
      await expect(page.getByRole('heading', { name: 'Error!' })).toBeVisible();
    });
  });

  test('should show error when signing in with empty credentials', async ({
    page,
    loginPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to login page', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/index.htm', { waitUntil: 'load' });
    });

    await test.step('Click Log In without entering credentials', async () => {
      await loginPage.clickLogIn();
    });

    await test.step('Verify login form remains visible', async () => {
      await loginPage.assertLoginFormVisible();
    });
  });
});
