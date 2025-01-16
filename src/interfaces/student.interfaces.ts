export type FamilyInfo = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type Student = {
  name: string;
  age: number;
  gender: "male" | "female";
  contactNo: string;
  address: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  profileImage?: string;
  isActive: boolean;
  familyInfo: FamilyInfo;
  email: string;
};
