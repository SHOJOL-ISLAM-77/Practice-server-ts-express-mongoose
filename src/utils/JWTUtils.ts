import jwt from "jsonwebtoken";
import config from "../config";

export const signToken = (payload: object) => {
  return jwt.sign(payload, config.access_token_secret as string, { expiresIn: "1h" });
};
