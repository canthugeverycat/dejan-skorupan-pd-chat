const db = require('../db');
const generateUniqueID = require('../../utils/generateUniqueID');

const getById = require('./get-one');

/**
 * Creates a new UserProfile
 *
 * @param {string} name Display name
 *
 * @returns {UserProfileType}
 */
const create = ({ name }) => {
  const id = generateUniqueID();

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO profiles (id, name) VALUES (?, ?)`,
      [id, name],
      (error) => {
        if (error) {
          reject(error);

          return;
        }

        getById(id)
          .then((data) => resolve(data))
          .catch((err) => reject(err));
      }
    );
  });
};

module.exports = create;
