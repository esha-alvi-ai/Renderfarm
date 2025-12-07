// backend/src/utils/file.js
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

module.exports = {
  async saveTemp(buffer, filename) {
    const tempPath = path.join(__dirname, "../../storage/temp", filename);
    fs.writeFileSync(tempPath, buffer);
    return tempPath;
  },

  async unzip(zipPath, outputDir) {
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(outputDir, true);
    return true;
  },

  ensureDir(p) {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  },

  readJSON(p) {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  },

  deleteFile(p) {
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
};
