/**
 * Check if ParaBank has returned an error page (backend issues).
 * Use this to skip tests when the demo site is unstable.
 */
export async function isParabankErrorPage(page) {
  const heading = page.getByRole('heading', { name: 'Error!' });
  return heading.isVisible().catch(() => false);
}
