import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import type { User } from "../interfaces/users.interfaces";
import Users from "../models/users.model";
import { signToken } from "../utils/JWTUtils";

export const loginUser = async (user: User) => {
  const token = signToken({ email: user.email, name: user.name, id: user._id });

  return {
    user: {
      name: user.name,
      email: user.email,
      profileUrl: user.profileUrl,
      contactNo: user.contactNo,
    },
    token,
  };
};
export const registerUser = async (userData: User) => {
  const result = await createUser(userData);

  if (!result) {
    throw new Error("Failed to create user");
  }
  const token = signToken({ email: result.email, name: result.name, id: result._id });

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
};

const createUser = async (userData: User) => {
  const { email, password, profileUrl, contactNo, name } = userData;

  if (!email || !password || !name || !profileUrl || !contactNo) {
    throw new Error("All fields are required");
  }
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await Users.create({
    name,
    email,
    password: passwordHash,
    profileUrl,
    contactNo,
    updatedAt: null,
  });
  return result;
};

export const updateLastLogin = async (userId: object | string | number) => {
  try {
    return await Users.findByIdAndUpdate(userId, { lastLogin: new Date() }, { new: true });
  } catch {
    throw new Error("Error updating last login time");
  }
};

export const verifyToken = (token: string) => {
  const secret = config.access_token_secret;
  try {
    return jwt.verify(token, secret as string);
  } catch {
    throw new Error("Invalid or expired token");
  }
};
