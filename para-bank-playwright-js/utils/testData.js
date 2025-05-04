import { faker } from '@faker-js/faker';

export function generateUser() {
  const uniqueSuffix = Date.now() + Math.floor(Math.random() * 1000);
  const username = `user_${uniqueSuffix}`;
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.string.numeric(9),
    username,
    password: 'Test@123'
  };
}

export function generateBiller() {
  return {
    billfirstName: faker.person.firstName(),
    billaddress: faker.location.streetAddress(),
    billcity: faker.location.city(),
    billstate: faker.location.state(),
    billzipCode: faker.location.zipCode(),
    billphone: faker.phone.number(),
    billcash: faker.finance.amount({min: 100, max: 999, dec: 0}),
  };
}

export function transferAmount() {
  return {
    transfercash: faker.finance.amount({min: 100, max: 999, dec: 0}),
  };
  
}


