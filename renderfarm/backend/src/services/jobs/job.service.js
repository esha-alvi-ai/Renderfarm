// backend/src/services/jobs/job.service.js
const Job = require("../../db/models/job.model");

module.exports = {
  async createJob(userId, projectName, template) {
    return Job.create({ userId, projectName, template });
  },

  async updateStatus(jobId, status) {
    return Job.findByIdAndUpdate(jobId, { status }, { new: true });
  },

  async assignTask(jobId, task) {
    return Job.findByIdAndUpdate(
      jobId,
      { $push: { tasks: task } },
      { new: true }
    );
  },

  async getJob(jobId) {
    return Job.findById(jobId);
  }
};
