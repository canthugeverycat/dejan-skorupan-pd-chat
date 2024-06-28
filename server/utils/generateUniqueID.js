const { customAlphabet } = require('nanoid');

/**
 * Generates a unique id for an entity
 *
 * @return  {string}
 */
const generateUniqueID = () => {
  const allowedChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const nanoid = customAlphabet(allowedChars, 10);

  return nanoid();
};

module.exports = generateUniqueID;
