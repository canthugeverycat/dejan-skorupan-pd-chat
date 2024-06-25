const express = require('express');

const profilesCreate = require('./profiles/create');
const profilesGetOne = require('./profiles/get-one');

const contactsGetByProfile = require('./contacts/get-by-profile');

const messagesCreate = require('./messages/create');
const messagesGetByChat = require('./messages/get-by-chat');

const router = express.Router();

/** Set up API endpoints */
router.use('/profiles', profilesCreate);
router.use('/profiles', profilesGetOne);

router.use('/profiles', contactsGetByProfile);

router.use('/chat', messagesCreate);
router.use('/chat', messagesGetByChat);

module.exports = router;
