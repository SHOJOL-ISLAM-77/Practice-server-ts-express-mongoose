"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validationError = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        if (el instanceof mongoose_1.default.Error.ValidatorError) {
            return {
                path: el.path,
                message: el.message,
                err: el.properties,
            };
        }
        else {
            return {
                path: el.path,
                message: el.message,
                err: null,
            };
        }
    });
    return errors[errors.length - 1];
};
exports.default = validationError;
