"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const auth_service_1 = require("../services/auth.service");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            status: "error",
            errorCode: "UNAUTHORIZED",
            message: "Authentication Token is Missing or Invalid",
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const user = (0, auth_service_1.verifyToken)(token);
        req.user = user;
        next();
    }
    catch (_a) {
        res.status(401).json({
            status: "error",
            errorCode: "TOKEN_INVALID",
            message: "Invalid or Expired Authentication Token",
        });
    }
};
exports.authenticate = authenticate;
