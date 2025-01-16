import type { Request, Response } from "express";
import { getSalesStatsDB } from "../services/salesStats.service";

export const getSalesStats = async (req: Request, res: Response) => {
  try {
    const result = await getSalesStatsDB();
    res.status(200).json({
      success: true,
      message: "Sales stats retrieved successfully",
      data: result,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve sales stats",
      error: error,
    });
  }
};
