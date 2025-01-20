import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import Users from "../models/users.model";
import {
  loginUser,
  registerUser,
  updateLastLogin,
} from "../services/auth.service";
import catchAsync from "../utils/catchAsync";

export const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      next({
        message: "User not found",
        statusCode: 404,
      });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        next({
          message: "Invalid password",
          statusCode: 401,
        });
      } else {
        const result = await loginUser(user);

        updateLastLogin(user._id);

        res.status(200).json({
          status: "success",
          data: result,
        });
      }
    }
  }
);

export const registerController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await registerUser(req.body);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
);
