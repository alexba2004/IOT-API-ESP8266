// DAO (Data Access Object)
const Sensor = require("../models/sensor.model");
const sensorDAO = {};

sensorDAO.getAll = async () => {
    const sensors = Sensor.find();
    return sensors;
};

sensorDAO.getAllFront = async () => {
    const sensors = Sensor.find();
    return sensors;
};

sensorDAO.insertOne = async (sensor) => {
    const sensorSaved = new Sensor(sensor);
    await sensorSaved.save();
    return "Sensor Saved";
};

module.exports = sensorDAO;
