const express = require("express");
const router = express.Router();

const {
  validateCreateJob
} = require("../validators/jobValidator");

const {
  createRenderJob
} = require("../controllers/jobController");

router.post("/create", validateCreateJob, createRenderJob);

module.exports = router;
