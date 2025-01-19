"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        validate: {
            validator: (value) => /^[a-z A-Z]+$/.test(value),
            message: "Name can only contain alphabets",
        },
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    profileUrl: {
        type: String,
        required: [true, "Please enter your profile image url"],
    },
    contactNo: {
        type: String,
        required: [true, "Please enter your contact number"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    lastLogin: {
        type: Date,
    },
});
const Users = mongoose_1.default.model("Users", UserSchema);
exports.default = Users;
