// Handles user ZIP upload → saves to storage → responds with file path

const path = require("path");
const fs = require("fs");
const { uploadToStorage } = require("../../services/storage/storageService");

exports.uploadProjectZip = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Upload file to S3 / local storage
    const storageLocation = await uploadToStorage(filePath);

    return res.status(200).json({
      message: "File uploaded successfully",
      storageLocation
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "File upload failed" });
  }
};
