const express = require('express');
const {
  profiles: { getOne: dbGetOne },
} = require('../../db/index');

const router = express.Router();

/**
 * Fetches a UserProfile by its id
 *
 * @param {number} id
 *
 * @return  {UserProfile}
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await dbGetOne(id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
