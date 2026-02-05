import { faker } from '@faker-js/faker';

/**
 * Generate valid registration data for ParaBank
 */
export function generateRegistrationData(overrides = {}) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const address = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state({ abbreviated: true });
  const zipCode = faker.location.zipCode();
  const phone = faker.phone.number();
  const ssn = faker.string.numeric(9);
  const rawUsername = faker.internet.username({ firstName, lastName });
  const username = rawUsername.slice(0, 20);
  const password = faker.internet.password({ length: 10 });

  return {
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    phone,
    ssn,
    username,
    password,
    ...overrides,
  };
}

/**
 * Generate lookup data (same structure as registration for forgot login)
 */
export function generateLookupData(overrides = {}) {
  return generateRegistrationData(overrides);
}
