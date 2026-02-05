import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BasePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async navigate(path = '/') {
    await this.step(`Navigate to ${path}`, async () => {
      await this.page.goto(path);
    });
  }

  async assertUrlContains(expected) {
    await this.step(`Assert URL contains "${expected}"`, async () => {
      await expect(this.page).toHaveURL(new RegExp(expected));
    });
  }

  async assertPageTitle(expected) {
    await this.step(`Assert page title is "${expected}"`, async () => {
      await expect(this.page).toHaveTitle(new RegExp(expected));
    });
  }
}
