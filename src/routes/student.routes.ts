import express from "express";
import {
  createStudent,
  deleteSingleStudent,
  getAllStudents,
  getFilteredStudents,
  getSingleStudent,
  updateSingleStudent,
} from "../controllers/student.controller";
import { authenticate } from "../middlewares/auth.middlewares";
import ObjectIdValidate from "../middlewares/ObjectIdValidate";

const router = express.Router();

router
  .post("/", authenticate, createStudent)
  .get("/", authenticate, getAllStudents)
  .get("/filtered", authenticate, getFilteredStudents);

router
  .get("/:id", ObjectIdValidate, authenticate, getSingleStudent)
  .patch("/:id", ObjectIdValidate, authenticate, updateSingleStudent)
  .delete("/:id", ObjectIdValidate, authenticate, deleteSingleStudent);

export default router;
