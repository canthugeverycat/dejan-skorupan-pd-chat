const db = require('../db');
const getById = require('./get-one');

/**
 * Creates a new UserProfile
 *
 * @param {string} name Display name
 *
 * @returns {UserProfileType}
 */
const create = ({ name }) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO profiles (name) VALUES (?)`, [name], function (error) {
      if (error) {
        reject(error);

        return;
      }

      getById(this.lastID)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  });
};

module.exports = create;
