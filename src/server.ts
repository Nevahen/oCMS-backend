require("dotenv").config();
import app from "./app";
import * as http from "http";
import { Sequelize } from "sequelize-typescript";
import * as Models from "./models_sequelize/index";
import Page from "./models_sequelize/page";
import User from "./models_sequelize/user";

const port = 80;

app.set("port", port);

const server = http.createServer(app);

const sequelize = new Sequelize({
  host: "localhost",
  database: process.env.DB_DATABASE,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASS
});

sequelize.addModels([Page, User]);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// Or you can simply use a connection uri

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  let addr = server.address();
  console.log("Listening on " + port);
}
