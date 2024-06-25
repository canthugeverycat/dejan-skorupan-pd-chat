const db = require('../db');

/**
 * Get a single user by its id
 * @param {number} id
 *
 * @return {UserType}
 */
const getOne = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
};

module.exports = getOne;
