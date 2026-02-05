import { test } from '@playwright/test';

export async function testStep(
  title: string,
  stepToRun: () => Promise<void>,
  userId = 0
): Promise<void> {
  let stepTitle = title;

  if (userId > 0) {
    stepTitle = `User${userId}: ${title}`;
  }

  await test.step(stepTitle, stepToRun);
}

export { expect } from '@playwright/test';
