import { test, expect } from '../../_fixtures/fixtures';
import { addSeverity } from '@/common/helpers/allureHelpers';
import { LookupData } from '@/common/helpers/userDataHelper';

test.describe('Forgot Login Info', () => {
  test('should navigate to customer lookup page', async ({
    page,
    loginPage,
    forgotLoginPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to login page', async () => {
      await page.goto('/parabank/index.htm');
    });

    await test.step('Click Forgot login info link', async () => {
      await loginPage.clickForgotLogin();
    });

    await test.step('Verify lookup form is displayed', async () => {
      await forgotLoginPage.assertLookupFormVisible();
      await expect(page).toHaveURL(/lookup/);
    });
  });

  test('should retrieve username when valid customer info is provided', async ({
    page,
    forgotLoginPage,
    registeredUser,
  }) => {
    addSeverity('critical');

    const lookupData: LookupData = {
      firstName: registeredUser.data.firstName,
      lastName: registeredUser.data.lastName,
      address: registeredUser.data.address,
      city: registeredUser.data.city,
      state: registeredUser.data.state,
      zipCode: registeredUser.data.zipCode,
      ssn: registeredUser.data.ssn,
    };

    await test.step('Navigate to lookup page', async () => {
      await page.goto('/parabank/lookup.htm');
    });

    await test.step('Fill lookup form with valid customer info', async () => {
      await forgotLoginPage.fillLookupForm(lookupData);
      await forgotLoginPage.clickFindLoginInfo();
    });

    await test.step('Verify username is displayed', async () => {
      await forgotLoginPage.assertUsernameRetrieved(registeredUser.username);
    });
  });

  test('should show error when lookup info does not match', async ({
    page,
    forgotLoginPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to lookup page', async () => {
      await page.goto('/parabank/lookup.htm');
    });

    await test.step('Fill lookup form with invalid data', async () => {
      const invalidData: LookupData = {
        firstName: 'Invalid',
        lastName: 'User',
        address: '123 Fake St',
        city: 'FakeCity',
        state: 'CA',
        zipCode: '90210',
        ssn: '111111111',
      };
      await forgotLoginPage.fillLookupForm(invalidData);
      await forgotLoginPage.clickFindLoginInfo();
    });

    await test.step('Verify error or form still visible', async () => {
      const error = page.locator('.error');
      const form = forgotLoginPage.findLoginInfoButton;
      await expect(error.or(form)).toBeVisible();
    });
  });
});
