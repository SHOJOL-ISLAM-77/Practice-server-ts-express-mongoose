"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationError_1 = __importDefault(require("../utils/validationError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let error = err;
    if (err.name === "ValidationError") {
        const customErrors = (0, validationError_1.default)(err);
        message = customErrors.message;
        error = customErrors.err;
    }
    res.status(statusCode).json({
        status: statusCode,
        success: false,
        message,
        error,
    });
};
exports.default = globalErrorHandler;
