import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TemplatePage extends BasePage {
  constructor(page: Page, userId = 0) {
    super(page, userId);
  }

  async clickSomething(): Promise<void> {
    await this.step('Click something', async () => {
      // example method
    });
  }

  async assertSomething(): Promise<void> {
    await this.step('Assert something', async () => {
      expect(true).toBe(true);
    });
  }
}
