import type { NextFunction, Response } from "express";
import { verifyToken } from "../services/auth.service";
import type { AuthenticatedRequest } from "../utils/type";

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
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
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch {
    res.status(401).json({
      status: "error",
      errorCode: "TOKEN_INVALID",
      message: "Invalid or Expired Authentication Token",
    });
  }
};
