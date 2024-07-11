const { verifyJWT } = require("../utils/Helper");
const { ApiError, ApiResp } = require("../utils/Response");
const { User } = require("../models");

const AuthMid = async (req, res, next) => {
  try {
    const header = req.header("authorization");

    if (!header) throw new ApiError("User not authorized to access", 401);

    const [bearer, token] = header.split(" ");

    if (bearer !== "Bearer") {
      throw new ApiError("User not authorized to access", 401);
    }

    const claims = verifyJWT(token, process.env.JWT_ACCESS_KEY);

    if (!claims) throw new ApiError("User not authorized to access", 401);

    const usr = await User.findOne({ where: { id: claims.id } });

    if (!usr) throw new ApiError("User not authorized to access", 401);

    if (claims?.msg && claims.msg === "jwt expired") {
      throw new ApiError("User token expired", 401);
    }

    if (claims.msg && claims.msg === "invalid signature") {
      throw new ApiError("User not authorized to access", 401);
    }

    req.user = claims;
    next();
  } catch (e) {
    console.log(e);

    next(new ApiError("User not authorized to access", 401));
  }
};



module.exports = AuthMid;
