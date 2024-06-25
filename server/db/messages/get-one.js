const db = require('../db');

/**
 * Get a single Message by its id
 *
 * @param {string} id
 *
 * @return {MessageType}
 */
const getOne = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM messages WHERE id = ?`, [id], (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
};

module.exports = getOne;
