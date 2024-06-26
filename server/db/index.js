// Profiles
const profilesCreate = require('./profiles/create');
const profilesGetOne = require('./profiles/get-one');

// Contacts
const contactsCreateForProfile = require('./contacts/create-for-profile');
const contactsGetByProfile = require('./contacts/get-by-profile');

// Messages
const messagesCreate = require('./messages/create');
const messagesUpdate = require('./messages/update');
const messagesGetOne = require('./messages/get-one');
const messagesGetByChat = require('./messages/get-by-chat');

module.exports = {
  profiles: { getOne: profilesGetOne, create: profilesCreate },
  contacts: {
    getByProfile: contactsGetByProfile,
    createForProfile: contactsCreateForProfile,
  },
  messages: {
    create: messagesCreate,
    update: messagesUpdate,
    getOne: messagesGetOne,
    getByChat: messagesGetByChat,
  },
};
