import type { Request, Response } from "express";
import { getSalesStatsDB } from "../services/salesStats.service";
import catchAsync from "../utils/catchAsync";

export const getSalesStats = catchAsync(async (req: Request, res: Response) => {
  const result = await getSalesStatsDB();
  res.status(200).json({
    success: true,
    message: "Sales stats retrieved successfully",
    data: result,
  });
});
