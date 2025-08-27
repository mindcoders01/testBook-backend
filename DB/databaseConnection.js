const mongoose = require("mongoose");
const db = process.env.MONGODB_URL;

exports.connectDB = async () => {
  try {
    await mongoose.connect(db);
    return "Database is connected";
  } catch (err) {
    throw err;
  }
};
