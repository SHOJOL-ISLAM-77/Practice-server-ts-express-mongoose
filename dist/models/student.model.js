"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FamilyInfoSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
});
const StudentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    profileImage: { type: String },
    isActive: { type: Boolean, required: true },
    familyInfo: { type: FamilyInfoSchema, required: true },
    email: { type: String, required: true },
});
const Student = (0, mongoose_1.model)("Student", StudentSchema);
exports.default = Student;
