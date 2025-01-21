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
        validate: {
            validator: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
            message: "Invalid email address",
        },
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
        validate: {
            validator: (value) => /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{6,10}$/.test(value),
            message: "Invalid contact Number",
        },
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
