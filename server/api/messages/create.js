const express = require('express');
const {
  messages: { create: dbCreate },
} = require('../../db/index');
const botReaction = require('../../ws/messages/bot-reaction');

const router = express.Router();

/**
 * Creates a new Message
 *
 * @param {string} body    Message body
 * @param {text} chatId    Reference id of the chat
 * @param {number} sender  0 - User  1 - Contact
 *
 * @return {MessageType} Newly created Message
 */
router.post('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  const { body, sender } = req.body;

  try {
    const data = await dbCreate({ body, chatId, sender });

    botReaction(req.app.get('wss'), data);

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
