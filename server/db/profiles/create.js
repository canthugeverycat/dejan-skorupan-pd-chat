const db = require('../db');
const generateUniqueID = require('../../utils/generateUniqueID');

const getById = require('./get-one');

/**
 * Creates a new UserProfile
 *
 * @param {string} name Display name
 * @param {number} avatar Profile avatar
 *
 * @returns {UserProfileType}
 */
const create = ({ name, avatar }) => {
  const id = generateUniqueID();

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO profiles (id, name, avatar) VALUES (?, ?, ?)`,
      [id, name, avatar],
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
