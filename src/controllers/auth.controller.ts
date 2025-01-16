import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import Users from "../models/users.model";
import { loginUser, registerUser, updateLastLogin } from "../services/auth.service";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: "Invalid password",
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
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error?.message || "Failed to login",
      error: error,
    });
  }
};

export const registerController = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error?.message || "Failed to register",
      error: error,
    });
  }
};
