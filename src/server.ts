import { Server } from "http";
import app from "./app";
import config from "./config";
import DBConnect from "./DB/DB";

DBConnect();

const server: Server = app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
});

process.on("uncaughtException", () => {
  process.exit(1);
});

process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
