const express = require("express");
const router = express.Router();

const { getJobTasks } = require("../controllers/taskController");

router.get("/:jobId", getJobTasks);

module.exports = router;
