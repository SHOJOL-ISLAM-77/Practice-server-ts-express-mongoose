export type User = {
  _id: string | number;
  name: string;
  email: string;
  profileUrl: string;
  contactNo: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
};
