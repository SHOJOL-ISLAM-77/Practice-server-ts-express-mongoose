"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const student_routes_1 = __importDefault(require("./student.routes"));
const router = express_1.default.Router();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many requests, please try again later.",
        statusCode: 429,
        success: false,
    },
});
router.use("/student", student_routes_1.default);
router.use("/auth", auth_routes_1.default);
exports.default = router;
