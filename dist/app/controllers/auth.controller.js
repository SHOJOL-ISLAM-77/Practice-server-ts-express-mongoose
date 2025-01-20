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
exports.registerController = exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_model_1 = __importDefault(require("../../models/users.model"));
const auth_service_1 = require("../services/auth.service");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield users_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        else {
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({
                    success: false,
                    message: "Invalid password",
                });
            }
            else {
                const result = yield (0, auth_service_1.loginUser)(user);
                (0, auth_service_1.updateLastLogin)(user._id);
                res.status(200).json({
                    status: "success",
                    data: result,
                });
            }
        }
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Failed to login",
            error: error,
        });
    }
});
exports.loginController = loginController;
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, auth_service_1.registerUser)(req.body);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: (error === null || error === void 0 ? void 0 : error.message) || "Failed to register",
            error: error,
        });
    }
});
exports.registerController = registerController;
