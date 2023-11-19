const sensorDAO = require("../dao/sensor.dao");
const sensorModel = require("../models/sensor.model");
const sensorController = {};

sensorController.getAll = async (req, res) => {
    sensorDAO
        .getAll()
        .then((sensors) => {
            res.json({ sensors });
        })
        .catch((err) => {
            res.json({
                status: "Query failed",
            });
        });
};

sensorController.getAllFront = async (req, res) => {
    sensorDAO
        .getAll()
        .then((sensors) => {
            res.render("../src/views/sensorValues", { sensors });
        })
        .catch((err) => {
            res.json({
                status: "Query failed",
            });
            console.log(err);
        });
};

sensorController.insertOne = async (req, res) => {
    sensorDAO
        .insertOne(req.body)
        .then((result) => {
            res.json({
                status: "Request Succed",
            });
        })
        .catch((err) => {
            res.json({
                status: "Request failed",
            });
        });
};

module.exports = sensorController;
