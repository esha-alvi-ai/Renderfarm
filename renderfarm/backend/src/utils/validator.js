// backend/src/utils/validator.js
module.exports = {
  requireFields(obj, fields) {
    for (let f of fields) {
      if (!obj[f]) return `Missing required field: ${f}`;
    }
    return null;
  },

  isNumber(n) {
    return !isNaN(Number(n));
  }
};
