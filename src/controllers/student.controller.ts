import type { Request, Response } from "express";
import type Student from "../models/student.model";
import {
  createStudentDB,
  deleteSingleStudentDB,
  getAllStudentsDB,
  getFilteredStudentsDB,
  getSingleStudentDB,
  updateSingleStudentDB,
} from "../services/students.service";
import catchAsync from "../utils/catchAsync";

export const createStudent = catchAsync(async (req: Request, res: Response) => {
  const student = req.body;
  const response = await createStudentDB(student);
  res.status(200).json({
    success: true,
    message: "Student created successfully",
    data: response,
  });
});

export const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const { perPage, page } = req.query;

  const { totalStudents, students } = await getAllStudentsDB({
    perPage,
    page,
  } as object);
  res.status(200).json({
    success: true,
    message: "Students retrieved successfully",
    totalStudents: totalStudents,
    data: students,
  });
});

export const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await getSingleStudentDB(id);

  res.status(200).json({
    success: true,
    message: "Student retrieved successfully",
    data: response,
  });
});

export const updateSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const updatedStudent = req.body;

  const { id } = req.params;

  const response = await updateSingleStudentDB(id, updatedStudent);

  res.status(200).json({
    success: true,
    message: `Hey! ${response?.name} your data  is updated`,
    data: response,
  });
});

export const deleteSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await deleteSingleStudentDB(id);
  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: response,
  });
});

export const getFilteredStudents = catchAsync(async (req: Request, res: Response) => {
  const { queryField, queryValue, perPage, page } = req.query;

  const { students, total, currentPage, totalPages, studentsPerPage } = await getFilteredStudentsDB(
    queryField as keyof Student,
    queryValue as string,
    perPage as string,
    page as string
  );
  res.status(200).json({
    success: true,
    message: "Students retrieved successfully",
    totalStudents: total,
    studentsPerPage,
    currentPage,
    totalPages,
    data: students,
  });
});
