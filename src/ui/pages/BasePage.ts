import type { Page } from '@playwright/test';
import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BasePage {
  page: Page;
  userId: number;

  constructor(page: Page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title: string, stepToRun: () => Promise<void>): Promise<void> {
    return await testStep(title, stepToRun, this.userId);
  }

  async navigate(path = '/'): Promise<void> {
    await this.step(`Navigate to ${path}`, async () => {
      await this.page.goto(path);
    });
  }

  async assertUrlContains(expected: string): Promise<void> {
    await this.step(`Assert URL contains "${expected}"`, async () => {
      await expect(this.page).toHaveURL(new RegExp(expected));
    });
  }

  async assertPageTitle(expected: string): Promise<void> {
    await this.step(`Assert page title is "${expected}"`, async () => {
      await expect(this.page).toHaveTitle(new RegExp(expected));
    });
  }
}
