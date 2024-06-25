const db = require('../db');

/**
 * Get all of the Contact items for the current profile
 *
 * @return  {ContactType[]}  A collection of Contact objects
 */
const getByProfile = (profileId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM contacts WHERE profileId = ? ORDER BY name ASC`,
      [profileId],
      (error, data) => {
        error ? reject(error) : resolve(data);
      }
    );
  });
};

module.exports = getByProfile;
