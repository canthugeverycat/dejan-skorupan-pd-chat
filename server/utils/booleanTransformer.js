const PROPERTIES = ['liked'];

/**
 * Transforms selected properties from 0-1 integer to boolean
 *
 * @param {Object} data
 */
const booleanTransformer = (data) => {
  const transformed = { ...data };

  for (const key in transformed) {
    if (PROPERTIES.includes(key)) {
      transformed[key] = !!transformed[key];
    }
  }

  return transformed;
};

module.exports = booleanTransformer;
