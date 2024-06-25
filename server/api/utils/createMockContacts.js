const { faker } = require('@faker-js/faker');

/**
 * Creates mock contacts objects
 *
 * @param   {number}  length  Number of contacts
 *
 * @return  {ContactType[]}
 */
const createMockContacts = (length) =>
  Array.from({ length }, (_, i) => ({
    id: i,
    name: faker.person.fullName(),
  }));

module.exports = createMockContacts;
