// backend/src/utils/error-handler.js
const logger = require("./logger");

module.exports = (err, req, res, next) => {
  logger.error(err.message);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
