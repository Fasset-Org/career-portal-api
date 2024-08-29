const { ApiError } = require("../utils/Response");

exports.authorize = function (...userTypes) {
  return (req, res, next) => {
    console.log(req.user)
    console.log(userTypes)
    try {
      if (!userTypes.includes(req.user.userType)) {
        next(
          new ApiError(
            `User role ${req.user.userType} is not authorized to access this route`,
            403
          )
        );
      }
      next();
    } catch (e) {
      console.log(e);
    }
  };
};
