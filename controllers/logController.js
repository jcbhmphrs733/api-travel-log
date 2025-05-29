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
  try {
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
  } catch (error) {
    res.status(error.status || 500).json({
      message:
        error.message || "An error occurred while fetching the log entry.",
    });
  }
}

  const postEntry = async (req, res) => {
    //#swagger.tags = ['Log']
    //#swagger.description = 'Create a new log entry'
    try {
      const entry = {
        date: req.body.date,
        time: req.body.time,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        temperature: req.body.temperature,
        wind_speed: req.body.wind_speed,
        wind_direction: req.body.wind_direction,
        heading: req.body.heading,
      };

      const response = await mongodb.getDb().collection("log").insertOne(entry);
      if (response.acknowledged) {
        res.status(201).json({
          message: "Entry created successfully",
          id: response.insertedId,
        });
      }
    } catch (error) {
      console.error("Error creating log entry:", error);
      throw createError(500, "An error occurred while creating the log entry.");
    }
  };

  const updateEntry = async (req, res) => {
    //#swagger.tags = ['Log']
    //#swagger.description = 'Update an existing log entry by ID'
    try {
      const entryId = ObjectId.createFromHexString(req.params.id);
      if (!entryId) {
        throw createError(404, "Entry does not exist.");
      }

      const entry = {
        date: req.body.date,
        time: req.body.time,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        temperature: req.body.temperature,
        wind_speed: req.body.wind_speed,
        wind_direction: req.body.wind_direction,
        heading: req.body.heading,
      };
      const response = await mongodb
        .getDb()
        .collection("log")
        .replaceOne({ _id: entryId }, entry);
      if (response.modifiedCount > 0) {
        res.status(200).send();
      }
    } catch (error) {
      console.error("Error updating log entry:", error);
      throw createError(500, "An error occurred while updating the log entry.");
    }
};

const deleteEntry = async (req, res) => {
  //#swagger.tags = ['Log']
  //#swagger.description = 'Delete an entry by ID'
  try {
    const entryId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb
      .getDb()
      .collection("log")
      .deleteOne({ _id: entryId });
    if (response.deletedCount === 0) {
      throw createError(404, "Entry ID does not exist.");
    } else {
      res.status(200).json({ message: "Entry deleted succesfully." });
    }
  } catch (error) {
    console.error("Error deleting entry:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the entry." });
  }
};

const postMany = async (req, res) => {
  //#swagger.tags = ['Log']
  //#swagger.description = 'Create multiple log entries at once'
  const entries = req.body; // Assuming entries is an array of entry objects
  try {
    if (!Array.isArray(entries)) {
      return res
        .status(400)
        .json({
          message: "Invalid input format. Expected an array of entries.",
        });
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
    }
  } catch (error) {
    console.error("Error creating log entries:", error);
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
