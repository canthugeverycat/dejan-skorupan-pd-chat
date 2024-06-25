const db = require('../db');

/**
 * Get all of the Messages for the Chat
 *
 * @param {string} chatId    Unique id for the chat
 *
 * @return  {MessageType[]}  Collection of Contact objects
 */
const getByChat = (chatId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM messages WHERE chatId = ? ORDER BY createdAt ASC`,
      [chatId],
      (error, data) => {
        error ? reject(error) : resolve(data);
      }
    );
  });
};

module.exports = getByChat;
