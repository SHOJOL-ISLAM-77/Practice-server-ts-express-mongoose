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

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const response = await createStudentDB(student);
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: response,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create student",
      error: error,
    });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const { perPage, page } = req.query;

    const { totalStudents, students } = await getAllStudentsDB({ perPage, page } as object);
    res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      totalStudents: totalStudents,
      data: students,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve students",
      error: error,
    });
  }
};

export const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getSingleStudentDB(id);
    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: response,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve student",
      error: error,
    });
  }
};

export const updateSingleStudent = async (req: Request, res: Response) => {
  const updatedStudent = req.body;
  try {
    const { id } = req.params;

    const response = await updateSingleStudentDB(id, updatedStudent);

    res.status(200).json({
      success: true,
      message: `Hey! ${response?.name} your data  is updated`,
      data: response,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || `Sorry ${updatedStudent?.name} we couldn't update your data`,
      error: error,
    });
  }
};

export const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteSingleStudentDB(id);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: response,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete student",
      error: error,
    });
  }
};

export const getFilteredStudents = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve students",
      error: error,
    });
  }
};
