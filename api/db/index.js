const mongoose = require('mongoose');
const accessEnv = require('../util/accessEnv');

const DB_URI = accessEnv('DB_CONNECTION_LOCAL');
// Connect to DB
const connectToDb = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    // console.log('connected to db');
  } catch (error) {
    // console.log('db error:', error.message);
  }
};

module.exports = connectToDb;
