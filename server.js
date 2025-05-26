const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const createError = require("http-errors");

const app = express();
const port = 3000;



app.use(express.static("public"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/", require("./routes/index"));

app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

mongodb.initDb((err) => {
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
