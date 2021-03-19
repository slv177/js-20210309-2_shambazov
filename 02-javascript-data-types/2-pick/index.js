/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const result = {};
  for (let key in obj) {
    // add keys and values if they are mentioned in the array
    if (fields.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
};
