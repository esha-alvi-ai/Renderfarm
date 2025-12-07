// backend/src/services/metadata-extractor/extractor.js
const fs = require("fs");
const path = require("path");

module.exports = {
  async extract(projectFilePath, defaultTemplate) {
    // Example extraction: Read frame range from text file or Blender project
    const ext = path.extname(projectFilePath);

    let extracted = {};

    if (ext === ".json") {
      const raw = JSON.parse(fs.readFileSync(projectFilePath));
      extracted.frames = raw.frames || defaultTemplate.frames;
      extracted.resolution = raw.resolution || defaultTemplate.resolution;
    }

    return {
      ...defaultTemplate,
      ...extracted
    };
  }
};
