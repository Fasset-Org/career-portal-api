const { ApiError } = require("../utils/Response");

const ErrorMid = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.errorCode).json({
      success: false,
      message: err.message,
      name: err.name,
      error: err,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Server Error",
    name: err.name,
    error: err,
  });
};

module.exports = ErrorMid;
