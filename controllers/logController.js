const mongodb = require("../data/database");
const createError = require("http-errors");

const ObjectId = require("mongodb").ObjectId;

const getLog = async (req, res) => {
  //#swagger.tags = ['Log']
  //#swagger.description = 'Get all log entries for the year 2000-2001'
  const response = await mongodb.getDb().collection("log").find();
  response
    .toArray()
    .then((log) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(log);
    })
    .catch((err) => {
      console.error("Error fetching logs:", err);
    });
};

const getEntry = async (req, res) => {
  //#swagger.tags = ['Log']
  //#swagger.description = 'Get a specific log entry by ID'
  const entryId = ObjectId.createFromHexString(req.params.id);

  const response = await mongodb
    .getDb()
    .collection("log")
    .findOne({ _id: entryId });

  if (!response) {
    throw createError(404, "Entry does not exist.");
  }
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(response);
};

const postEntry = async (req, res) => {
  //#swagger.tags = ['Log']
  //#swagger.description = 'Create a new log entry'
  const entry = {
    date: req.body.date,
    time: req.body.time,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    temperature: req.body.temperature,
    wind_speed: req.body.wind_speed,
    wind_direction: req.body.wind_direction,
    heading: req.body.heading
  };

  const response = await mongodb
    .getDb()
    .collection("log")
    .insertOne(entry);
  if (response.acknowledged) {
    res
      .status(201)
      .json({ message: "Entry created successfully", id: response.insertedId });
  } else {
    res.status(500).json({ message: "Failed to create entry" });
  }
};

const updateEntry = async (req, res) => {
  //#swagger.tags = ['Log']
  //#swagger.description = 'Update an existing log entry by ID'
  const entryId = ObjectId.createFromHexString(req.params.id);
  try {
    if (!entryId) {
      throw createError(404, "Entry does not exist.");
    }
  } catch (error) {
    console.log(error.message);
  }
  const entry = {
    date: req.body.date,
    time: req.body.time,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    temperature: req.body.temperature,
    wind_speed: req.body.wind_speed,
    wind_direction: req.body.wind_direction,
    heading: req.body.heading
  };
  const response = await mongodb
    .getDb()
    .collection("log")
    .replaceOne({ _id: entryId }, entry);
  if (response.modifiedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while updating the user.");
  }
};

const deleteEntry = async (req, res) => {
  //#swagger.tags = ['Log']
  //#swagger.description = 'Delete a log entry by ID'
  const entryId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .collection("log")
    .deleteOne({ _id: entryId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while deleting the user.");
  }
  try {
    if (!response) {
      throw createError(404, "Entry does not exist.");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const postMany = async (req, res) => {
  //#swagger.tags = ['Log']
  //#swagger.description = 'Create multiple log entries at once'
  const entries = req.body; // Assuming entries is an array of entry objects
  if (!Array.isArray(entries)) {
    return res
      .status(400)
      .json({ message: "Invalid input format. Expected an array of entries." });
  }

  const response = await mongodb
    .getDb()
    .collection("log")
    .insertMany(entries);
  if (response.acknowledged) {
    res.status(201).json({
      message: "Entries created successfully",
      ids: response.insertedIds,
    });
  } else {
    res.status(500).json({ message: "Failed to create entries" });
  }
};

module.exports = {
  getLog,
  getEntry,
  postEntry,
  updateEntry,
  deleteEntry,
  postMany,
};
