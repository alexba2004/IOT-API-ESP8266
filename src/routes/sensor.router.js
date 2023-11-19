const sensorController = require("../controllers/sensor.controller");
const { Router } = require("express");
const chalk = require("chalk");

const router = Router();
console.log(chalk.blue("---------------------------------------------"));
router.get("/getAll", sensorController.getAll);
router.get("/getAllFront", sensorController.getAllFront);
router.post("/insertOne", sensorController.insertOne);

module.exports = router;
