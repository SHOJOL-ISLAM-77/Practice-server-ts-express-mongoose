import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: object | string;
}
