// backend/src/utils/path-helper.js
const path = require("path");

module.exports = {
  inputPath(jobId) {
    return path.join(__dirname, "../../storage/input", jobId);
  },

  outputPath(jobId) {
    return path.join(__dirname, "../../storage/output", jobId);
  },

  tempPath() {
    return path.join(__dirname, "../../storage/temp");
  }
};
