// Imports
const express = require("express");
const sensorRouter = require("./routes/sensor.router");

// Instance
const app = express();

// Settings
app.set("PORT", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/sensors", sensorRouter);

module.exports = app;
