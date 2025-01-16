import express from "express";
import rateLimit from "express-rate-limit";
import authRouter from "./auth.routes";
import studentRouter from "./student.routes";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests, please try again later.",
    statusCode: 429,
    success: false,
  },
});

router.use("/student", studentRouter);
router.use("/auth", authRouter);

export default router;
