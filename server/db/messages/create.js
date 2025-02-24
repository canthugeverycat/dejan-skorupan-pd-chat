const db = require('../db');
const generateUniqueID = require('../../utils/generateUniqueID');
const booleanTransformer = require('../../utils/booleanTransformer');

const getById = require('./get-one');

/**
 * Creates a new Message
 *
 * @param {string} body       Message body
 * @param {string} chatId     Reference id of the chat
 * @param {number} sender     0 - User  1 - Contact
 *
 * @returns {MessageType}
 */
const create = ({ body, chatId, sender }) => {
  const id = generateUniqueID();

  return new Promise((resolve, reject) => {
    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO messages (id, body, createdAt, chatId, sender, liked) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, body, createdAt, chatId, sender, 0],
      (error) => {
        if (error) {
          reject(error);

          return;
        }

        getById(id)
          .then((data) => resolve(booleanTransformer(data)))
          .catch((err) => reject(err));
      }
    );
  });
};

module.exports = create;
