const db = require('../db');
const getById = require('./get-one');

/**
 * Creates a new User item
 *
 * @param {string} name Display name of the current user
 *
 */
const create = ({ name }) => {
  return new Promise((resolve, reject) => {
    const createdAt = new Date().toISOString();

    db.run(`INSERT INTO users (name) VALUES (?)`, [name], function (error) {
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
