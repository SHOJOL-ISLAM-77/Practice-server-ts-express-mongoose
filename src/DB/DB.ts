import mongoose from "mongoose";
import config from "../config";

const DBConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};

export default DBConnect;
