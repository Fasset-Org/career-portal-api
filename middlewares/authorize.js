exports.authorize = function (...userTypes) {
  return (req, res, next) => {
    if (!userTypes.includes(req.user.userType)) {
      next(
        new ApiError(
          `User role ${req.user.userType} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};