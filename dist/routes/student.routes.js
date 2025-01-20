"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const ObjectIdValidate_1 = __importDefault(require("../middlewares/ObjectIdValidate"));
const router = express_1.default.Router();
router
    .post("/", auth_middlewares_1.authenticate, student_controller_1.createStudent)
    .get("/", auth_middlewares_1.authenticate, student_controller_1.getAllStudents)
    .get("/filtered", auth_middlewares_1.authenticate, student_controller_1.getFilteredStudents);
router
    .get("/:id", ObjectIdValidate_1.default, auth_middlewares_1.authenticate, student_controller_1.getSingleStudent)
    .patch("/:id", ObjectIdValidate_1.default, auth_middlewares_1.authenticate, student_controller_1.updateSingleStudent)
    .delete("/:id", ObjectIdValidate_1.default, auth_middlewares_1.authenticate, student_controller_1.deleteSingleStudent);
exports.default = router;
