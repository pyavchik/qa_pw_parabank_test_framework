import { faker } from '@faker-js/faker';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}

/**
 * Generate valid registration data for ParaBank
 */
export function generateRegistrationData(
  overrides: Partial<RegistrationData> = {}
): RegistrationData {
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

/** Lookup form data (subset of RegistrationData) */
export interface LookupData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  ssn: string;
}

/**
 * Generate lookup data (same structure as registration for forgot login)
 */
export function generateLookupData(
  overrides: Partial<LookupData> = {}
): LookupData {
  const full = generateRegistrationData(overrides);
  return {
    firstName: full.firstName,
    lastName: full.lastName,
    address: full.address,
    city: full.city,
    state: full.state,
    zipCode: full.zipCode,
    ssn: full.ssn,
  };
}
