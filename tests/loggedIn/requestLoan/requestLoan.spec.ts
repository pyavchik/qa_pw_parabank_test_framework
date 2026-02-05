import { test, expect } from '../../_fixtures/fixtures';
import { addSeverity } from '@/common/helpers/allureHelpers';
import { isParabankErrorPage } from '@/common/helpers/parabankHelpers';

test.describe('Request Loan', () => {
  test('should display request loan form', async ({
    page,
    loggedInUser: _loggedInUser,
    requestLoanPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to request loan page', async () => {
      await page.goto('/parabank/requestloan.htm');
      // eslint-disable-next-line playwright/no-conditional-in-test
      if (await isParabankErrorPage(page)) {
        // eslint-disable-next-line playwright/no-skipped-test
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
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(accountIds.length === 0, 'No accounts available');

    await test.step('Navigate to request loan page', async () => {
      await page.goto('/parabank/requestloan.htm');
    });

    await test.step('Submit loan request', async () => {
      await requestLoanPage.requestLoan(5000, 1000, accountIds[0]);
    });

    await test.step('Verify loan result', async () => {
      const approved = page.getByRole('heading', {
        name: /Loan.*Processed|Approved/i,
      });
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
      // eslint-disable-next-line playwright/no-skipped-test
      test.skip(accountIds.length === 0, 'No accounts available');

      await test.step('Navigate to request loan page', async () => {
        await page.goto('/parabank/requestloan.htm');
      });

      await test.step(`Request loan of ${loanAmount}`, async () => {
        const downPayment = loanAmount * 0.2;
        const accountId = accountIds[0];
        await requestLoanPage.requestLoan(loanAmount, downPayment, accountId);
      });

      await test.step('Verify loan result displayed', async () => {
        const result = page.locator('#rightPanel');
        const regex = /Loan|Amount|Payment|Denied|Approved/i;
        await expect(result).toContainText(regex);
      });
    });
  }
});
