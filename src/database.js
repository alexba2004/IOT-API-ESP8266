const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
    .connect("") // Reemplaza con el enlace de conexión a tu cluster MongoDB Atlas.
    .then((db) => console.log(chalk.green("\n===============[MongoDB Atlas]===============\nStatus: Connected")))
    .catch((err) => console.error(chalk.red(`\n===============[MongoDB Atlas]===============\nStatus: Error\n${err}\n`)));
