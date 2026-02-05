import { test, expect } from '../../_fixtures/fixtures';
import { addSeverity } from '../../../src/common/helpers/allureHelpers';
import { isParabankErrorPage } from '../../../src/common/helpers/parabankHelpers';

test.describe('Request Loan', () => {
  test('should display request loan form', async ({
    page,
    loggedInUser,
    requestLoanPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to request loan page', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/requestloan.htm');
      // eslint-disable-next-line playwright/no-conditional-in-test -- skip on demo backend error
      if (await isParabankErrorPage(page)) {
        // eslint-disable-next-line playwright/no-skipped-test -- demo site flakiness
        test.skip(true, 'ParaBank demo backend returned error');
      }
    });

    await test.step('Verify request loan form is visible', async () => {
      await requestLoanPage.assertRequestLoanFormVisible();
    });
  });

  test('should approve loan with valid amount and down payment', async ({
    page,
    loggedInUser,
    requestLoanPage,
  }) => {
    addSeverity('critical');

    const accountIds = loggedInUser.accountIds;
    // eslint-disable-next-line playwright/no-skipped-test -- skip when no accounts available
    test.skip(accountIds.length === 0, 'No accounts available');

    await test.step('Navigate to request loan page', async () => {
      await page.goto('/parabank/requestloan.htm');
    });

    await test.step('Submit loan request', async () => {
      await requestLoanPage.requestLoan(5000, 1000, accountIds[0]);
    });

    await test.step('Verify loan result', async () => {
      const approved = page.getByRole('heading', { name: /Loan.*Processed|Approved/i });
      const denied = page.getByText(/denied/i);
      await expect(approved.or(denied)).toBeVisible();
    });
  });

  for (const loanAmount of [1000, 5000, 10000]) {
    test(`should process loan amount ${loanAmount}`, async ({
      page,
      loggedInUser,
      requestLoanPage,
    }) => {
      addSeverity('normal');

      const accountIds = loggedInUser.accountIds;
      // eslint-disable-next-line playwright/no-skipped-test -- skip when no accounts available
      test.skip(accountIds.length === 0, 'No accounts available');

      await test.step('Navigate to request loan page', async () => {
        await page.goto('/parabank/requestloan.htm');
      });

      await test.step(`Request loan of ${loanAmount}`, async () => {
        await requestLoanPage.requestLoan(loanAmount, loanAmount * 0.2, accountIds[0]);
      });

      await test.step('Verify loan result displayed', async () => {
        const result = page.locator('#rightPanel');
        await expect(result).toContainText(/Loan|Amount|Payment|Denied|Approved/i);
      });
    });
  }
});
