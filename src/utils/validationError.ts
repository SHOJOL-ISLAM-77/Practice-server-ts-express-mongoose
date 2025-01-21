import mongoose from "mongoose";

const validationError = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => {
    if (el instanceof mongoose.Error.ValidatorError) {
      return {
        path: el.path,
        message: el.message,
        err: el.properties,
      };
    } else {
      return {
        path: el.path,
        message: el.message,
        err: null,
      };
    }
  });
  return errors[errors.length - 1];
};

export default validationError;
