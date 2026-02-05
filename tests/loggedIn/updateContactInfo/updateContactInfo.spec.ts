import { test } from '../../_fixtures/fixtures';
import { addSeverity } from '../../../src/common/helpers/allureHelpers';
import { isParabankErrorPage } from '../../../src/common/helpers/parabankHelpers';
import { faker } from '@faker-js/faker';

test.describe('Update Contact Info', () => {
  test('should update contact info successfully', async ({
    page,
    loggedInUser: _loggedInUser,
    updateContactInfoPage,
  }) => {
    addSeverity('critical');

    await test.step('Navigate to update profile page', async () => {
      await page.goto('/parabank/updateprofile.htm');
      // eslint-disable-next-line playwright/no-conditional-in-test
      if (await isParabankErrorPage(page)) {
        // eslint-disable-next-line playwright/no-skipped-test
        test.skip(true, 'ParaBank demo backend returned error');
      }
    });

    const newData = {
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      phone: faker.phone.number(),
    };

    await test.step('Update contact information', async () => {
      await updateContactInfoPage.updateContactInfo(newData);
      await updateContactInfoPage.clickUpdateProfile();
    });

    await test.step('Verify profile updated', async () => {
      await updateContactInfoPage.assertProfileUpdated();
    });
  });

  test('should display update profile form', async ({
    page,
    loggedInUser: _loggedInUser,
    updateContactInfoPage,
  }) => {
    addSeverity('normal');

    await test.step('Navigate to update profile page', async () => {
      await page.goto('/parabank/updateprofile.htm');
      // eslint-disable-next-line playwright/no-conditional-in-test
      if (await isParabankErrorPage(page)) {
        // eslint-disable-next-line playwright/no-skipped-test
        test.skip(true, 'ParaBank demo backend returned error');
      }
    });

    await test.step('Verify update profile form is visible', async () => {
      await updateContactInfoPage.assertUpdateProfileFormVisible();
    });
  });
});
