const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB error (when the _id is wrong.)
  if ((err.name = "CastError")) {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err)
    // Type message:err.stack to know the type of the error
    res.status(err.statusCode).json({ success: false, message: err.message });
};
