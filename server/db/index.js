const profilesCreate = require('./profiles/create');
const profilesGetOne = require('./profiles/get-one');

const contactsCreateForProfile = require('./contacts/create-for-profile');
const contactsGetByProfile = require('./contacts/get-by-profile');

module.exports = {
  profiles: { getOne: profilesGetOne, create: profilesCreate },
  contacts: {
    getByProfile: contactsGetByProfile,
    createForProfile: contactsCreateForProfile,
  },
};
