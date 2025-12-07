// backend/src/api/middleware/validateRequest.js

exports.validateJob = (req, res, next) => {
  const { jobId, totalFrames, framePerTask } = req.body;

  if (!jobId)
    return res.status(400).json({ message: "jobId is required" });

  if (!totalFrames || totalFrames <= 0)
    return res.status(400).json({ message: "totalFrames must be > 0" });

  if (!framePerTask || framePerTask <= 0)
    return res.status(400).json({ message: "framePerTask must be > 0" });

  next(); // request is valid → go to controller
};
