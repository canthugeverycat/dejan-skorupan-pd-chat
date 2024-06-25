const express = require('express');
const {
  contacts: { getByProfile: dbGetByProfile },
} = require('../../db/index');

const router = express.Router();

/**
 * Fetches all Contact items for the current profile
 *
 * @return  {ContactType[]} A collection of Contacts items
 */
router.get('/:id/contacts', async (req, res) => {
  const { id } = req.params;
  console.log('getting by profile', id);
  try {
    const users = await dbGetByProfile(id);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
