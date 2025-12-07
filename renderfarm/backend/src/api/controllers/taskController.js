// backend/src/api/controllers/taskController.js

const Task = require("../../db/models/Task");
const Job = require("../../db/models/Job");
const Worker = require("../../db/models/Worker");

const chunker = require("../../core/chunker");
const scheduler = require("../../core/scheduler");

// ================================
// Create a new task
// ================================
exports.createTask = async (req, res) => {
  try {
    const { jobId, framePerTask } = req.body;

    // Fetch the job details
    const job = await Job.findOne({ jobId });
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Split into chunks
    const chunks = chunker.splitFrames(job.totalFrames, framePerTask);

    const tasksToCreate = chunks.map((chunk, idx) => ({
      taskId: `${jobId}-task-${idx + 1}`,
      jobId: job._id,
      frameStart: chunk.start,
      frameEnd: chunk.end,
    }));

    const createdTasks = await Task.insertMany(tasksToCreate);

    return res.json({
      message: "Tasks created successfully",
      totalTasks: createdTasks.length,
    });
  } catch (err) {
    console.error("Task Creation Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================================
// Assign pending tasks to workers
// ================================
exports.assignPendingTasks = async (req, res) => {
  try {
    const pendingTasks = await Task.find({ status: "pending" });

    if (!pendingTasks.length)
      return res.json({ message: "No pending tasks found" });

    const idleWorkers = await Worker.find({ status: "idle" });

    if (!idleWorkers.length)
      return res.json({ message: "No idle workers available" });

    const assignments = await scheduler.assignTasks(pendingTasks, idleWorkers);

    return res.json({
      message: "Task assignment complete",
      assignments,
    });

  } catch (err) {
    console.error("Task Assignment Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================================
// Get task status
// ================================
exports.getTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findOne({ taskId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.json(task);

  } catch (err) {
    console.error("Status Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
