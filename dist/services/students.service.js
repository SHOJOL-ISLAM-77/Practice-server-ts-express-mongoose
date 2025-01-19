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
exports.getFilteredStudentsDB = exports.deleteSingleStudentDB = exports.updateSingleStudentDB = exports.getSingleStudentDB = exports.getAllStudentsDB = exports.createStudentDB = void 0;
const student_model_1 = __importDefault(require("../models/student.model"));
const createStudentDB = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.default.create(student);
    return result;
});
exports.createStudentDB = createStudentDB;
const getAllStudentsDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ perPage = 10, page = 1 }) {
    const students = yield student_model_1.default.find()
        .skip(perPage * (page - 1))
        .limit(perPage);
    const totalStudents = yield student_model_1.default.countDocuments();
    return { totalStudents, students };
});
exports.getAllStudentsDB = getAllStudentsDB;
const getSingleStudentDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.default.findById(id);
    return student;
});
exports.getSingleStudentDB = getSingleStudentDB;
const updateSingleStudentDB = (id, updatedStudent) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.default.findByIdAndUpdate(id, { $set: updatedStudent }, { new: true });
    return student;
});
exports.updateSingleStudentDB = updateSingleStudentDB;
const deleteSingleStudentDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.default.findByIdAndDelete(id);
    return student;
});
exports.deleteSingleStudentDB = deleteSingleStudentDB;
const getFilteredStudentsDB = (queryField_1, queryValue_1, ...args_1) => __awaiter(void 0, [queryField_1, queryValue_1, ...args_1], void 0, function* (queryField, queryValue, perPage = "10", page = "1") {
    const limit = Math.max(1, parseInt(perPage, 10));
    const currentPage = Math.max(1, parseInt(page, 10));
    const skip = (currentPage - 1) * limit;
    const result = yield student_model_1.default.find({ [queryField]: queryValue })
        .limit(limit)
        .skip(skip);
    const total = yield student_model_1.default.countDocuments({ [queryField]: queryValue });
    return {
        students: result,
        total,
        currentPage,
        studentsPerPage: limit,
        totalPages: Math.ceil(total / limit),
    };
});
exports.getFilteredStudentsDB = getFilteredStudentsDB;
