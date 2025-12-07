// backend/src/db/models/Task.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskId: { type: String, unique: true, required: true },

  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },

  assignedWorker: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Worker", 
    default: null 
  },

  frameStart: { type: Number, required: true },
  frameEnd: { type: Number, required: true },

  outputPath: { type: String },

  status: {
    type: String,
    enum: ["pending", "assigned", "completed", "failed"],
    default: "pending",
  }

}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
