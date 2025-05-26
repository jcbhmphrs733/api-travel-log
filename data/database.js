const dotenv = require("dotenv");

dotenv.config();

const MongoClient = require("mongodb").MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database already initialized.");
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client.db(); // <-- set to your actual DB name
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return database; // returns the db object
};

module.exports = {
  initDb,
  getDb,
};