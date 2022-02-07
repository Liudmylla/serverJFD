const express = require("express");

const mongoose = require("mongoose");

const config = require("config");

const chalk = require("chalk");

const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//   console.log(chalk.gray("Production"));
// } else {
//   console.log(chalk.gray("Development"));
// }

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.greenBright("Mongo db connected ... "));
    app.listen(PORT, () =>
      console.log(
        chalk.greenBright(`Server has been started on port ${PORT}  ...`)
      )
    );
  } catch (error) {
    console.log(chalk.redBright(error.message));
    process.exit(1);
  }
}
start();
