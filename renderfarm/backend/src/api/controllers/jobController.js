// backend/src/api/controllers/jobController.js

const Job = require("../../db/models/Job");
const Task = require("../../db/models/Task");
const Worker = require("../../db/models/Worker");

// ================================
// Create a new Job
// ================================
exports.createJob = async (req, res) => {
  try {
    const { jobId, projectPath, jsonTemplate, totalFrames, framePerTask } = req.body;

    const job = await Job.create({
      jobId,
      projectPath,
      jsonTemplate,
      totalFrames,
      framePerTask,
    });

    return res.json({
      message: "Job created successfully",
      job,
    });

  } catch (err) {
    console.error("Job Creation Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================================
// Update job status (queued, processing, completed)
// ================================
exports.updateJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    const job = await Job.findOneAndUpdate(
      { jobId },
      { status },
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    return res.json({
      message: "Status updated",
      job,
    });

  } catch (err) {
    console.error("Status Update Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================================
// Submit job result from worker
// ================================
exports.submitJobResult = async (req, res) => {
  try {
    const { taskId, outputPath } = req.body;

    const task = await Task.findOneAndUpdate(
      { taskId },
      { status: "completed", outputPath },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Check if all tasks of this job are done
    const unfinished = await Task.count({
      jobId: task.jobId,
      status: { $ne: "completed" }
    });

    if (unfinished === 0) {
      await Job.findByIdAndUpdate(task.jobId, { status: "completed" });
    }

    return res.json({
      message: "Result submitted successfully",
      task,
    });

  } catch (err) {
    console.error("Job Result Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
