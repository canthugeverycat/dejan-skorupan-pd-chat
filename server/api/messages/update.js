const express = require('express');
const {
  messages: { update: dbUpdate },
} = require('../../db/index');

const router = express.Router();

/**
 * Updates an existing message
 *
 * @param {MessageType} body Any properties of the message
 *
 * @return {MessageType} Newly updated Message
 */
router.put('/:chatId/messages/:id', async (req, res) => {
  const { chatId, id } = req.params;

  try {
    const data = await dbUpdate({ id, ...req.body });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
