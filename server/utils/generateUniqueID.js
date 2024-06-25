const { customAlphabet } = require('nanoid');

const generateUniqueID = () => {
  const allowedChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const nanoid = customAlphabet(allowedChars, 10);

  return nanoid();
};

module.exports = generateUniqueID;
