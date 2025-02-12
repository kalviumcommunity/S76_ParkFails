const mongoose = require("mongoose");

let dbStatus = "Disconnected";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
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

