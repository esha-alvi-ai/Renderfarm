// backend/src/db/models/Worker.js
const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  workerId: { type: String, unique: true, required: true },

  status: {
    type: String,
    enum: ["idle", "busy", "offline"],
    default: "idle",
  },

  lastHeartbeat: { type: Date },

  cpuLoad: { type: Object }, // Example: { cores: 50% }
  freeMem: { type: Number }, // in bytes
}, { timestamps: true });

module.exports = mongoose.model("Worker", WorkerSchema);
