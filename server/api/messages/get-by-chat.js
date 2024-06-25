const express = require('express');
const {
  messages: { getByChat: dbGetByChat },
} = require('../../db/index');

const router = express.Router();

/**
 * Fetches all messages for a chat
 *
 * @param {string} chatId  Unique identifier for the chat
 *
 * @return  {MessageType[]} A collection of messages
 */
router.get('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await dbGetByChat(chatId);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
