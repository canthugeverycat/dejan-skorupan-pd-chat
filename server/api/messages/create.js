const express = require('express');
const {
  messages: { create: dbCreate },
} = require('../../db/index');

const router = express.Router();

/**
 * Creates a new Message
 *
 * @param {string} body    Message body
 * @param {number} chatId  Reference id of the chat
 * @param {number} sender  0 - User  1 - Contact
 *
 * @return {MessageType} Newly created Message
 */
router.post('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  const { body, sender } = req.body;

  try {
    const data = await dbCreate({ body, chatId, sender });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
