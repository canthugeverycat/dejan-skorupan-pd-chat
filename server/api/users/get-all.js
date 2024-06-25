const express = require('express');
const {
  users: { getAll: dbGetAll },
} = require('../../db/index');

const router = express.Router();

/**
 * Fetches all User items
 *
 * @return  {UserType[]} A collection of User items
 */
router.get('/', async (req, res) => {
  try {
    const users = await dbGetAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
