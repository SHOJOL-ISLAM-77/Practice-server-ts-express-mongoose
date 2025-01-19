"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.updateLastLogin = exports.registerUser = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const users_model_1 = __importDefault(require("../models/users.model"));
const JWTUtils_1 = require("../utils/JWTUtils");
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, JWTUtils_1.signToken)({ email: user.email, name: user.name, id: user._id });
    return {
        user: {
            name: user.name,
            email: user.email,
            profileUrl: user.profileUrl,
            contactNo: user.contactNo,
        },
        token,
    };
});
exports.loginUser = loginUser;
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield createUser(userData);
    if (!result) {
        throw new Error("Failed to create user");
    }
    const token = (0, JWTUtils_1.signToken)({ email: result.email, name: result.name, id: result._id });
    const user = {
        name: result.name,
        email: result.email,
        profileUrl: result.profileUrl,
        contactNo: result.contactNo,
    };
    return {
        user,
        token,
    };
});
exports.registerUser = registerUser;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, profileUrl, contactNo, name } = userData;
    if (!email || !password || !name || !profileUrl || !contactNo) {
        throw new Error("All fields are required");
    }
    const existingUser = yield users_model_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const passwordHash = yield bcryptjs_1.default.hash(password, 10);
    const result = yield users_model_1.default.create({
        name,
        email,
        password: passwordHash,
        profileUrl,
        contactNo,
        updatedAt: null,
    });
    return result;
});
const updateLastLogin = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield users_model_1.default.findByIdAndUpdate(userId, { lastLogin: new Date() }, { new: true });
    }
    catch (_a) {
        throw new Error("Error updating last login time");
    }
});
exports.updateLastLogin = updateLastLogin;
const verifyToken = (token) => {
    const secret = config_1.default.access_token_secret;
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (_a) {
        throw new Error("Invalid or expired token");
    }
};
exports.verifyToken = verifyToken;
