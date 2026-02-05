import { test } from '../../_fixtures/fixtures';
import { addSeverity } from '@/common/helpers/allureHelpers';
import { generateRegistrationData } from '@/common/helpers/userDataHelper';

test.describe('Register', () => {
  test('should successfully register a new user with valid data', async ({
    page,
    registerPage,
  }) => {
    addSeverity('critical');

    const data = generateRegistrationData();

    await test.step('Navigate to register page', async () => {
      await page.goto('/parabank/register.htm');
    });

    await test.step('Fill registration form with valid data', async () => {
      await registerPage.fillRegistrationForm(data);
      await registerPage.clickRegister();
    });

    await test.step('Verify welcome message and redirect', async () => {
      await registerPage.assertWelcomeMessageVisible(data.username);
    });
  });

  test('should show validation error for empty required fields', async (
    { page, registerPage },
  ) => {
    addSeverity('normal');

    await test.step('Navigate to register page', async () => {
      await page.goto('/parabank/register.htm');
    });

    await test.step('Submit empty registration form', async () => {
      await registerPage.clickRegister();
    });

    await test.step('Verify form remains visible', async () => {
      await registerPage.assertRegisterFormVisible();
    });
  });

  test('should show error when password and confirm do not match', async (
    { page, registerPage },
  ) => {
    addSeverity('normal');

    const data = generateRegistrationData();

    await test.step('Navigate to register page', async () => {
      await page.goto('/parabank/register.htm');
    });

    await test.step('Fill form with mismatched passwords', async () => {
      const formData = { ...data, password: 'Pass123!' };
      await registerPage.fillRegistrationForm(formData, {
        confirmPassword: 'DifferentPass1!',
      });
      await registerPage.clickRegister();
    });

    await test.step('Verify validation error is shown', async () => {
      await registerPage.assertValidationErrorVisible();
    });
  });
});
