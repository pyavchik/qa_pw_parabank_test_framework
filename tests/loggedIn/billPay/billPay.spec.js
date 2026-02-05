import { test } from '../../_fixtures/fixtures';
import { addSeverity } from '../../../src/common/helpers/allureHelpers';
import { isParabankErrorPage } from '../../../src/common/helpers/parabankHelpers';
import { faker } from '@faker-js/faker';

test.describe('Bill Pay', () => {
  test('should pay bill successfully', async ({
    page,
    loggedInUser,
    billPayPage,
  }) => {
    addSeverity('critical');

    const accountIds = loggedInUser.accountIds;
    // eslint-disable-next-line playwright/no-skipped-test -- skip when no accounts available
    test.skip(accountIds.length === 0, 'No accounts available');

    const payeeData = {
      payeeName: faker.person.fullName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      phone: faker.phone.number(),
      accountNumber: faker.finance.accountNumber(10),
      amount: 100,
    };

    await test.step('Navigate to bill pay page', async () => {
      await page.goto('/parabank/billpay.htm');
    });

    await test.step('Fill and submit bill payment', async () => {
      await billPayPage.payBill(payeeData, accountIds[0]);
    });

    await test.step('Verify payment completed', async () => {
      await billPayPage.assertPaymentComplete();
    });
  });

  test('should display bill pay form', async ({
    page,
    loggedInUser: _loggedInUser,
    billPayPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to bill pay page', async () => {
      await page.goto('https://parabank.parasoft.com/parabank/billpay.htm');
      // eslint-disable-next-line playwright/no-conditional-in-test -- skip on demo backend error
      if (await isParabankErrorPage(page)) {
        // eslint-disable-next-line playwright/no-skipped-test -- demo site flakiness
        test.skip(true, 'ParaBank demo backend returned error');
      }
    });

    await test.step('Verify bill pay form is visible', async () => {
      await billPayPage.assertBillPayFormVisible();
    });
  });
});
