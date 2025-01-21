"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const DB_1 = __importDefault(require("./DB/DB"));
(0, DB_1.default)();
const server = app_1.default.listen(config_1.default.port, () => {
    console.log("Server is running on port " + config_1.default.port);
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
