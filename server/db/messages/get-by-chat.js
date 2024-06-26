const db = require('../db');
const booleanTransformer = require('../../utils/booleanTransformer');

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
      (error, rawData) => {
        const data = rawData.map((d) => booleanTransformer(d));

        error ? reject(error) : resolve(data);
      }
    );
  });
};

module.exports = getByChat;
