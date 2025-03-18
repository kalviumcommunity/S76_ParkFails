const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Ensure dotenv is loaded
dotenv.config();

let dbStatus = "Disconnected";

const connectDatabase = async () => {
  try {
    // Debug output to see what environment variables are available
    console.log("MongoDB URI:", process.env.DB_URL || process.env.MONGODB_URI || "Not defined");
    
    // Try both common environment variable names
    const connectionString = process.env.DB_URL || process.env.MONGODB_URI;
    
    if (!connectionString) {
      throw new Error("Database connection string not found in environment variables");
    }
    
    const connection = await mongoose.connect(connectionString);
    dbStatus = "Connected";
    console.log(`MongoDB connected with server: ${connection.connection.host}`);
  } catch (err) {
    dbStatus = "Disconnected";
    console.error(`Database connection failed: ${err.message}`);
    // Implement retry logic with a 5 second delay
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDatabase, 5000);
  }
};

// Also listen for disconnect events to update status
mongoose.connection.on('disconnected', () => {
  dbStatus = "Disconnected";
  console.log('MongoDB disconnected');
});

module.exports = { connectDatabase, dbStatus };
