import mongoose from "mongoose";
import type { User } from "../interfaces/users.interfaces";

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    validate: {
      validator: (value: string) => /^[a-z A-Z]+$/.test(value),
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

const Users = mongoose.model<User>("Users", UserSchema);
export default Users;
