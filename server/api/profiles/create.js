const express = require('express');
const {
  profiles: dbProfiles,
  contacts: dbContacts,
} = require('../../db/index');
const createMockContacts = require('../../utils/createMockContacts');

const router = express.Router();

/**
 * Creates a new UserProfile
 *
 * @return {UserProfileType} Newly created profile
 */
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const data = await dbProfiles.create({ name });

    await dbContacts.createForProfile(data.id, createMockContacts(10));

    setTimeout(() => {
      res.status(201).json(data);
    }, 1000);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;