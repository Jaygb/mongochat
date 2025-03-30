const mongoose = require('mongoose');
const config = require('../utils/config');

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false);
    const connected = await mongoose.connect(
      config.mongodb.uri,
    );
    console.log(`Mongodb connected ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
