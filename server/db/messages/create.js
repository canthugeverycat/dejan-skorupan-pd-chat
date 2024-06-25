const db = require('../db');
const getById = require('./get-one');

/**
 * Creates a new Message
 *
 * @param {string} body       Message body
 * @param {number} chatId  Reference id of the chat
 * @param {number} sender     0 - User  1 - Contact
 *
 *
 * @returns {MessageType}
 */
const create = ({ body, chatId, sender }) => {
  return new Promise((resolve, reject) => {
    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO messages (body, createdAt, chatId, sender) VALUES (?, ?, ?, ?)`,
      [body, createdAt, chatId, sender],
      function (error) {
        if (error) {
          reject(error);

          return;
        }

        getById(this.lastID)
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      }
    );
  });
};

module.exports = create;
