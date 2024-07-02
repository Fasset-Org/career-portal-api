const jwt = require("jsonwebtoken");

const Helper = {
  generateJWT: (payload, secret, expiresIn = undefined) => {
    if (!expiresIn) {
      return jwt.sign(payload, secret);
    }

    return jwt.sign(payload, secret, { expiresIn: expiresIn });
  },
  verifyJWT: (token, secret) => {
    const claims = jwt.verify(token, secret);
    return claims;
  },

  SESSION_COOKIE_OPTIONS: {
    httpOnly: true, // so that the cookie cannot be accessed via JS code from the browser/client site
    secure: false, // only for dev - set true when you want you cookies to be create on @https secure origin
    sameSite: "lax", // cookie is set only when the domain URL in the browser matches the doamin in the cookie
    maxAge: 1000 * 60 * 60 + 1000 * 60 * 60 * 2 // 1 hour
  },
  REFRESH_SESSION_COOKIE_OPTIONS: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 31 + 1000 * 60 * 60 * 2 // 7 days
  }
};

module.exports = Helper;
