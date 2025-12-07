// backend/src/db/models/Job.js
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobId: { type: String, unique: true, required: true },

  projectPath: { type: String, required: true },

  jsonTemplate: { type: Object, required: true }, // updated using uploaded files

  totalFrames: { type: Number, required: true },
  framePerTask: { type: Number, required: true },

  status: {
    type: String,
    enum: ["queued", "processing", "completed", "failed"],
    default: "queued",
  },
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
