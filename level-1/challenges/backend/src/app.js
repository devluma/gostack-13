const express = require("express");
const cors = require("cors");
const { isUuid } = require("uuidv4");
const routes = require("./routes");

const app = express();

function logRequests(request, response, next) {
  const DEBUG = false;
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  if (DEBUG) {
    console.time(logLabel);
  }

  next();

  if (DEBUG) {
    console.timeEnd(logLabel);
  }
}

function validateRepositoryID(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid Repository ID." });
  }

  return next();
}

app.use(express.json());
app.use(cors());
app.use(logRequests);
app.use("/repositories/:id", validateRepositoryID);
app.use("/", routes);

module.exports = app;
