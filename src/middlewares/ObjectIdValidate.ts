import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const ObjectIdValidate = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid Object ID" });
    return;
  }

  next();
};

export default ObjectIdValidate;
