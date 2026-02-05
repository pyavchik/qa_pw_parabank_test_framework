import { test as baseTest } from './fixturesGeneric';
import { LoginPage } from '../../src/ui/pages/LoginPage';
import { RegisterPage } from '../../src/ui/pages/RegisterPage';
import { ForgotLoginPage } from '../../src/ui/pages/ForgotLoginPage';
import { generateRegistrationData } from '../../src/common/helpers/userDataHelper';

export const test = baseTest.extend<{
  loginPage: LoginPage;
  registerPage: RegisterPage;
  forgotLoginPage: ForgotLoginPage;
  registeredUser: { username: string; password: string; data: ReturnType<typeof generateRegistrationData> };
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

  forgotLoginPage: async ({ page }, use) => {
    const forgotLoginPage = new ForgotLoginPage(page);
    await use(forgotLoginPage);
  },

  registeredUser: async ({ page, loginPage, registerPage }, use) => {
    const data = generateRegistrationData();
    await page.goto('/parabank/register.htm');
    await registerPage.fillRegistrationForm(data);
    await registerPage.clickRegister();
    await use({
      username: data.username,
      password: data.password,
      data,
    });
  },
});

export { expect } from '@playwright/test';
