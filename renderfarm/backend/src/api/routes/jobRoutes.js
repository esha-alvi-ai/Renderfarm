// backend/src/api/routes/jobRoutes.js
const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const auth = require("../middleware/authMiddleware");
const { validateJob } = require("../middleware/validateRequest");

// CREATE JOB
router.post("/create", auth, validateJob, jobController.createJob);

// GET ALL JOBS
router.get("/", auth, jobController.getJobs);

// GET SINGLE JOB
router.get("/:jobId", auth, jobController.getJobById);

module.exports = router;
