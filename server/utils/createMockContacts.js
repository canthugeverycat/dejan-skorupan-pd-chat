const { faker } = require('@faker-js/faker');
const generateUniqueID = require('../utils/generateUniqueID');

const AVATARS_BY_GENDER = {
  male: [0, 1, 2, 4, 5, 7, 8, 9, 11, 12, 13],
  female: [3, 6, 10, 14, 15],
};
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
    const avatarIndex = faker.number.int({
      min: 0,
      max: AVATARS_BY_GENDER[gender].length - 1,
    });
    const avatar = AVATARS_BY_GENDER[gender][avatarIndex];

    return {
      id,
      gender,
      name,
      avatar,
    };
  });

module.exports = createMockContacts;
