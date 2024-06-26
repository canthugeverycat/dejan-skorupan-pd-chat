const db = require('../db');
const booleanTransformer = require('../../utils/booleanTransformer');

const getById = require('./get-one');

/**
 * Updates an existing Message
 *
 * @param {string}      id     Existing Message id
 *
 * @param {MessageType} body   Any of the MessageType properties
 *
 * @returns {MessageType}
 */
const update = ({ id, ...props }) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE messages SET ';
    const sqlMatcher = ' WHERE id = ?';
    const paramNames = [];
    const params = [];

    for (const key in props) {
      paramNames.push(`${key} = ?`);
      params.push(props[key]);
    }
    params.push(id);

    const query = sql + paramNames.join(', ') + sqlMatcher;

    db.run(query, params, (error) => {
      if (error) {
        reject(error);

        return;
      }

      getById(id)
        .then((data) => resolve(booleanTransformer(data)))
        .catch((err) => reject(err));
    });
  });
};

module.exports = update;
