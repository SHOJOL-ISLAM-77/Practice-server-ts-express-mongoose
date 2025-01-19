"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const selesStats_controller_1 = require("./controllers/selesStats.controller");
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// export const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
// app.use(limiter);
app.get("/", selesStats_controller_1.getSalesStats);
app.use("/api/v1", routes_1.default);
app.use(globalErrorHandler_1.default);
app.all("*", (req, res) => {
    res.status(404).send("Route not found");
});
exports.default = app;
