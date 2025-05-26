const mongodb = require("../data/database");

const ObjectId = require("mongodb").ObjectId;

const getLog = async (req, res) => {
  const result = await mongodb.getDb().collection("2000-2001").find();
  result
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
  const entryId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDb()
    .collection("2000-2001")
    .find({ _id: entryId });
  result
    .toArray()
    .then((log) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(log);
    })
    .catch((err) => {
      console.error("Error fetching logs:", err);
    });
};

const postEntry = async (req, res) => {
  const entry = {
    date: req.body.date,
    time: req.body.time,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    temperature: req.body.temperature,
    wind_speed: req.body.wind_speed,
    wind_direction: req.body.wind_direction,
    heading: req.body.heading,
    potable_water_gallons: req.body.potable_water_gallons,
  };

  const result = await mongodb
    .getDb()
    .collection("2000-2001")
    .insertOne(entry);
  if (result.acknowledged) {
    res
      .status(201)
      .json({ message: "Entry created successfully", id: result.insertedId });
  } else {
    res.status(500).json({ message: "Failed to create entry" });
  }
};

const updateEntry = async (req, res) => {
  const entryId = ObjectId.createFromHexString(req.params.id);
  const entry = {
    date: req.body.date,
    time: req.body.time,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    temperature: req.body.temperature,
    wind_speed: req.body.wind_speed,
    wind_direction: req.body.wind_direction,
    heading: req.body.heading,
    potable_water_gallons: req.body.potable_water_gallons,
  };
  const response = await mongodb.getDb().collection("2000-2001").replaceOne({ _id: entryId }, entry);
  if (response.modifiedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || "An error occurred while updating the user.");
  }
};

const deleteEntry = async (req, res) => {
  const entryId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb.getDb().collection("2000-2001").deleteOne({ _id: entryId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || "An error occurred while deleting the user.");
  }
};

const postMany = async (req, res) => {
  const entries = req.body; // Assuming entries is an array of entry objects
  if (!Array.isArray(entries)) {
    return res.status(400).json({ message: "Invalid input format. Expected an array of entries." });
  }

  const result = await mongodb.getDb().collection("2000-2001").insertMany(entries);
  if (result.acknowledged) {
    res.status(201).json({ message: "Entries created successfully", ids: result.insertedIds });
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
  postMany
};
