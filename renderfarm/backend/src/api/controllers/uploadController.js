// backend/src/api/controllers/uploadController.js

const path = require("path");
const fs = require("fs");
const Job = require("../../db/models/Job");

// ================================
// Upload JSON/Files
// ================================
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    return res.json({
      message: "File uploaded",
      filePath: req.file.path,
    });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================================
// Upload JSON Template and create job
// ================================
exports.uploadJsonTemplate = async (req, res) => {
  try {
    const { jobId, totalFrames, framePerTask } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "No JSON uploaded" });

    const jsonContent = JSON.parse(fs.readFileSync(req.file.path, "utf8"));

    const job = await Job.create({
      jobId,
      projectPath: req.file.path,
      jsonTemplate: jsonContent,
      totalFrames,
      framePerTask,
    });

    return res.json({
      message: "Template uploaded and job created",
      job,
    });

  } catch (err) {
    console.error("Template Upload Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
