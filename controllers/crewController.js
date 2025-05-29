const mongodb = require("../data/database");
const createError = require("http-errors");
const ObjectId = require("mongodb").ObjectId;

const getCrew = async (req, res) => {
  //#swagger.tags = ['Crew']
  //#swagger.description = 'Get all crew members'
  try {
    const response = await mongodb.getDb().collection("crew").find();
    response.toArray().then((log) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(log);
    });
  } catch (err) {
    console.error("Error fetching crew:", err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching crew members." });
  }
};

const getCrewMember = async (req, res) => {
  //#swagger.tags = ['Crew']
  //#swagger.description = 'Get a specific crew member by ID'
  try {
    const entryId = ObjectId.createFromHexString(req.params.id);

    const response = await mongodb
      .getDb()
      .collection("crew")
      .findOne({ _id: entryId });

    if (!response) {
      throw createError(404, "Crew member ID does not exist.");
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({
      message:
        error.message || "An error occurred while fetching the crew member.",
    });
  }
};

const postCrewMember = async (req, res) => {
  //#swagger.tags = ['Crew']
  //#swagger.description = 'Create a new crew member'
  try {
    const entry = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rank: req.body.rank,
      age: req.body.age,
      home_country: req.body.home_country,
      time_onboard_months: req.body.time_onboard_months,
      hire_date: req.body.hire_date,
    };

    const response = await mongodb.getDb().collection("crew").insertOne(entry);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Entry created successfully",
        id: response.insertedId,
      });
    }
  } catch (error) {
    console.error("Error creating crew member:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the crew member." });
  }
};

const updateCrewMember = async (req, res) => {
  //#swagger.tags = ['Crew']
  //#swagger.description = 'Update an existing crew member by ID'
  try {
    const crewId = ObjectId.createFromHexString(req.params.id);

    const entry = {
      fist_name: req.body.fist_name,
      last_name: req.body.last_name,
      rank: req.body.rank,
      age: req.body.age,
      home_country: req.body.home_country,
      time_onboard_months: req.body.time_onboard_months,
      hire_date: req.body.hire_date,
    };
    const response = await mongodb
      .getDb()
      .collection("crew")
      .replaceOne({ _id: crewId }, entry);
    if (response.modifiedCount > 0) {
      res.status(200).send();
    }
  } catch (error) {
    console.error("Error updating crew member:", error);
    throw createError(500, "An error occurred while updating the crew member.");
  }
};

const deleteCrewMember = async (req, res) => {
  //#swagger.tags = ['Crew']
  //#swagger.description = 'Delete a crew member by ID'
  try {
    const crewId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb
      .getDb()
      .collection("crew")
      .deleteOne({ _id: crewId });
    if (response.deletedCount === 0) {
      throw createError(404, "Crew member ID does not exist.");
    } else {
      res.status(200).json({ message: "Crew member deleted succesfully." });
    }
  } catch (error) {
    console.error("Error deleting crew member:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the crew member." });
  }
};

const postMany = async (req, res) => {
  //#swagger.tags = ['Crew']
  //#swagger.description = 'Create multiple crew members at once'
  try {
    const entries = req.body; // Assuming entries is an array of entry objects
    if (!Array.isArray(entries)) {
      return res
        .status(400)
        .json({
          message: "Invalid input format. Expected an array of entries.",
        });
    }

    const response = await mongodb
      .getDb()
      .collection("crew")
      .insertMany(entries);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Entries created successfully",
        ids: response.insertedIds,
      });
    }
  } catch {
    console.error("Error creating multiple crew members:", error);
    res.status(500).json({ message: "Failed to create entries" });
  }
};

module.exports = {
  getCrew,
  getCrewMember,
  postCrewMember,
  updateCrewMember,
  deleteCrewMember,
  postMany,
};
