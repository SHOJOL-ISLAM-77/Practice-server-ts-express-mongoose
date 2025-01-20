"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../../controllers/student.controller");
const auth_middlewares_1 = require("../../middlewares/auth.middlewares");
const objectIdValidate_middleware_1 = require("../../middlewares/objectIdValidate.middleware");
const router = express_1.default.Router();
router
    .post("/", auth_middlewares_1.authenticate, student_controller_1.createStudent)
    .get("/", auth_middlewares_1.authenticate, student_controller_1.getAllStudents)
    .get("/filtered", auth_middlewares_1.authenticate, student_controller_1.getFilteredStudents);
router
    .get("/:id", objectIdValidate_middleware_1.ObjectIdValidate, auth_middlewares_1.authenticate, student_controller_1.getSingleStudent)
    .patch("/:id", objectIdValidate_middleware_1.ObjectIdValidate, auth_middlewares_1.authenticate, student_controller_1.updateSingleStudent)
    .delete("/:id", objectIdValidate_middleware_1.ObjectIdValidate, auth_middlewares_1.authenticate, student_controller_1.deleteSingleStudent);
exports.default = router;
