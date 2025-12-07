// backend/src/services/queue/queue.service.js
const Queue = require("bull");

const taskQueue = new Queue("render-tasks", {
  redis: { host: "127.0.0.1", port: 6379 }
});

module.exports = {
  async addTask(task) {
    return taskQueue.add(task);
  },

  listen(onTask) {
    taskQueue.process(async (job) => {
      return onTask(job.data);
    });
  }
};
