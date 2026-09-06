const { faker } = require('@faker-js/faker');

module.exports = {
  newUser: {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: `${faker.string.numeric(4)}${faker.string.alpha({ count: 2, casing: 'upper' })}`,
    phone: faker.string.numeric(10),
    dob: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }).toISOString().split('T')[0],
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 })
  },
  updatedUser: {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: `${faker.string.numeric(4)}${faker.string.alpha({ count: 2, casing: 'upper' })}`,
    phone: faker.string.numeric(10),
    dob: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }).toISOString().split('T')[0],
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 })
  }
};
