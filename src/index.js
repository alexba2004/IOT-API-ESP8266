const app = require("./app");
const chalk = require("chalk");
require("./database");

app.listen(app.get("PORT"), () => {
    console.log(chalk.green(`================[SERVER PORT]================\nServer on port: ${app.get("PORT")}\nURL: http://localhost:${app.get("PORT")}`));
});
