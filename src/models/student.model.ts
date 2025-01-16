import { Schema, model } from "mongoose";
import type { FamilyInfo } from "../interfaces/student.interfaces";
import { Student } from "../interfaces/student.interfaces";

const FamilyInfoSchema = new Schema<FamilyInfo>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const StudentSchema = new Schema<Student>({
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

const Student = model<Student>("Student", StudentSchema);

export default Student;
