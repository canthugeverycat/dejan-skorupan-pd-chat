const express = require('express');
const {
  profiles: dbProfiles,
  contacts: dbContacts,
} = require('../../db/index');
const createMockContacts = require('../utils/createMockContacts');

const router = express.Router();

/**
 * Creates a new UserProfile
 *
 * @return {UserProfileType} Id of the newly created profile
 */
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const data = await dbProfiles.create({ name });

    await dbContacts.createForProfile(data.id, createMockContacts(10));

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
