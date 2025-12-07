// backend/src/db/connect.js
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/renderfarm", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected ✔");
  } catch (err) {
    console.error("MongoDB Connection Failed ❌", err);
    process.exit(1);
  }
};
