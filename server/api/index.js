const express = require('express');
const profilesCreate = require('./profiles/create');
const profilesGetOne = require('./profiles/get-one');
const contactsGetByProfile = require('./contacts/get-by-profile');

const router = express.Router();

/** Set up API endpoints */
router.use('/', profilesCreate);
router.use('/', profilesGetOne);

router.use('/', contactsGetByProfile);

module.exports = router;
