// backend/src/api/middleware/authMiddleware.js

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  if (token !== process.env.API_SECRET) {
    return res.status(403).json({ message: "Forbidden: Invalid Token" });
  }

  next();
};
