const db = require('../db');

/**
 * Get all of the user items
 *
 * @return  {UsetType[]}  A collection of User objects
 */
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users ORDER BY name ASC`, (error, data) => {
      error ? reject(error) : resolve(data);
    });
  });
};

module.exports = getAll;
