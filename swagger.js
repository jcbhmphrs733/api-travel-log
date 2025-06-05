const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv");
dotenv.config();

const isDev = process.env.NODE_ENV === "development";
const doc = {
  info: {
    title: "travel-log-api",
    description: "API for a logging travel entries and crew members",
  },
  host: isDev ? "localhost:3000" : "api-travel-log.onrender.com",
  schemes: isDev? "http" : "https",
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
