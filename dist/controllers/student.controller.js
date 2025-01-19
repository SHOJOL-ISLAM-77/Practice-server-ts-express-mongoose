"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredStudents = exports.deleteSingleStudent = exports.updateSingleStudent = exports.getSingleStudent = exports.getAllStudents = exports.createStudent = void 0;
const students_service_1 = require("../services/students.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.createStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = req.body;
    const response = yield (0, students_service_1.createStudentDB)(student);
    res.status(200).json({
        success: true,
        message: "Student created successfully",
        data: response,
    });
}));
exports.getAllStudents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { perPage, page } = req.query;
    const { totalStudents, students } = yield (0, students_service_1.getAllStudentsDB)({
        perPage,
        page,
    });
    res.status(200).json({
        success: true,
        message: "Students retrieved successfully",
        totalStudents: totalStudents,
        data: students,
    });
}));
exports.getSingleStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield (0, students_service_1.getSingleStudentDB)(id);
    res.status(200).json({
        success: true,
        message: "Student retrieved successfully",
        data: response,
    });
}));
exports.updateSingleStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedStudent = req.body;
    const { id } = req.params;
    const response = yield (0, students_service_1.updateSingleStudentDB)(id, updatedStudent);
    res.status(200).json({
        success: true,
        message: `Hey! ${response === null || response === void 0 ? void 0 : response.name} your data  is updated`,
        data: response,
    });
}));
exports.deleteSingleStudent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield (0, students_service_1.deleteSingleStudentDB)(id);
    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: response,
    });
}));
exports.getFilteredStudents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { queryField, queryValue, perPage, page } = req.query;
    const { students, total, currentPage, totalPages, studentsPerPage } = yield (0, students_service_1.getFilteredStudentsDB)(queryField, queryValue, perPage, page);
    res.status(200).json({
        success: true,
        message: "Students retrieved successfully",
        totalStudents: total,
        studentsPerPage,
        currentPage,
        totalPages,
        data: students,
    });
}));
