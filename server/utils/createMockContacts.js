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
  Array.from({ length }, (_, i) => {
    const id = generateUniqueID();
    const gender = faker.person.sex();
    const name = faker.person.firstName(gender);

    return {
      id,
      gender,
      name,
    };
  });

module.exports = createMockContacts;
