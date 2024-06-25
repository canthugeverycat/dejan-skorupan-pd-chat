const express = require('express');
const {
  users: { create: dbCreate },
} = require('../../db/index');

const router = express.Router();

/**
 * Creates a new User item
 *
 * @return {string} Id of the newly created item
 */
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const data = await dbCreate({ name });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
