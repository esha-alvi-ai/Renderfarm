const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "storage/uploads/" });
const { uploadProjectZip } = require("../controllers/uploadController");

router.post("/upload", upload.single("projectZip"), uploadProjectZip);

module.exports = router;
