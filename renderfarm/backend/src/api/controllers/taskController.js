// Returns all tasks / job progress to frontend

const Task = require("../../db/models/taskModel");

exports.getJobTasks = async (req, res) => {
  try {
    const { jobId } = req.params;

    const tasks = await Task.find({ jobId });

    return res.status(200).json(tasks);

  } catch (error) {
    console.error("Task Fetch Error:", error);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
