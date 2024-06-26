const db = require('../db');

/**
 * Creates a batch of contacts for a profile
 *
 * @param {number} profileId Id of the profile to create contacts for
 * @param {ContactType[]} contacts Display name of the current user
 *
 */
const createForProfile = (profileId, contacts) => {
  return new Promise((resolve, reject) => {
    db.run('BEGIN TRANSACTION', () => {
      const insertStatement = db.prepare(
        'INSERT INTO contacts (id, name, gender, profileId) VALUES (?, ?, ?, ?)'
      );

      contacts.forEach((contact) => {
        const { id, name, gender } = contact;
        insertStatement.run(id, name, gender, profileId);
      });

      db.run('COMMIT', (error) => {
        if (error) {
          reject(error);

          return;
        }

        resolve();
      });
    });
  });
};

module.exports = createForProfile;
