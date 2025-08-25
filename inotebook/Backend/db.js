const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook"; // You should name your DB here

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI); 
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};

module.exports = connectToMongo;
