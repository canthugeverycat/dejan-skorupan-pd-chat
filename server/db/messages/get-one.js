const db = require('../db');
const booleanTransformer = require('../../utils/booleanTransformer');

/**
 * Get a single Message by its id
 *
 * @param {string} id
 *
 * @return {MessageType}
 */
const getOne = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM messages WHERE id = ?`, [id], (error, rawData) => {
      const data = booleanTransformer(rawData);
      error ? reject(error) : resolve(data);
    });
  });
};

module.exports = getOne;
