const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB connected with server: ${connection.connection.host}`);
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    // Implement retry logic with a 5 second delay
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDatabase, 5000);
  }
};

module.exports = connectDatabase;
