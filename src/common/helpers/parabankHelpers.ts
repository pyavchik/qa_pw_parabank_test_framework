import type { Page } from '@playwright/test';

/**
 * Check if ParaBank has returned an error page (backend issues).
 * Use this to skip tests when the demo site is unstable.
 */
export async function isParabankErrorPage(page: Page): Promise<boolean> {
  const heading = page.getByRole('heading', { name: 'Error!' });
  return heading.isVisible().catch(() => false);
}
