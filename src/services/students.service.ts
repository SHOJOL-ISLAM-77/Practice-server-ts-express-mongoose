import type { Student as studentType } from "../interfaces/student.interfaces";
import Student from "../models/student.model";

export const createStudentDB = async (student: studentType) => {
  const result = await Student.create(student);
  return result;
};

export const getAllStudentsDB = async ({ perPage = 10, page = 1 }) => {
  const students = await Student.find()
    .skip(perPage * (page - 1))
    .limit(perPage);
  const totalStudents = await Student.countDocuments();
  return { totalStudents, students };
};

export const getSingleStudentDB = async (id: string) => {
  const student = await Student.findById(id);
  if (student === null) {
    throw new Error("Student Not Found");
  }
  return student;
};

export const updateSingleStudentDB = async (id: string, updatedStudent: studentType) => {
  const student = await Student.findByIdAndUpdate(id, { $set: updatedStudent }, { new: true });
  return student;
};

export const deleteSingleStudentDB = async (id: string) => {
  const student = await Student.findByIdAndDelete(id);
  return student;
};

export const getFilteredStudentsDB = async (
  queryField: keyof Student,
  queryValue: string,
  perPage = "10",
  page = "1"
) => {
  const limit = Math.max(1, parseInt(perPage, 10));
  const currentPage = Math.max(1, parseInt(page, 10));
  const skip = (currentPage - 1) * limit;

  const result = await Student.find({ [queryField]: queryValue })
    .limit(limit)
    .skip(skip);

  const total = await Student.countDocuments({ [queryField]: queryValue });

  return {
    students: result,
    total,
    currentPage,
    studentsPerPage: limit,
    totalPages: Math.ceil(total / limit),
  };
};
