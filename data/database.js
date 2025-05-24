const dotenv = require("dotenv");

dotenv.config();

const MongoClient = require("mongodb").MongoClient;

let database;

const initializeDatabase = (callback) => {
  if (database) {
    console.log("Database already initialized.");
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return database;
};

module.exports = {
  initializeDatabase,
  getDatabase,
};