const db = require('../db');

/**
 * Get a single User Profile by its id
 *
 * @param {string} id
 *
 * @return {UserProfileType}
 */
const getOne = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM profiles WHERE id = ?`, [id], (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
};

module.exports = getOne;
