const express = require("express");
const mongodb = require("./data/database");

const app = express();
const port = 3000;

app.use("/", require("./routes/index"));

mongodb.initialize((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  } else {
    console.log("Connected to the database successfully.");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});


