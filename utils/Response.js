class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.message = message || "Server Error";
    this.errorCode = code || 5000;
  }
}

const ApiResp = (message, key = 'data', data = {}) => {
  return {
    success: true,
    message: message,
    [key]: data,
  };
};

module.exports = {
  ApiError,
  ApiResp,
};
