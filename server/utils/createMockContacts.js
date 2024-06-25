const { faker } = require('@faker-js/faker');
const generateUniqueID = require('../utils/generateUniqueID');

/**
 * Creates mock contacts objects
 *
 * @param   {number}  length  Number of contacts
 *
 * @return  {ContactType[]}
 */
const createMockContacts = (length) =>
  Array.from({ length }, (_, i) => ({
    id: generateUniqueID(),
    name: faker.person.fullName(),
  }));

module.exports = createMockContacts;
