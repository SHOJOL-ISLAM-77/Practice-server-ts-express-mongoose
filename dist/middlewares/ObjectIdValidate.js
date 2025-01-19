"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectIdValidate = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid Object ID" });
        return;
    }
    next();
};
exports.default = ObjectIdValidate;
