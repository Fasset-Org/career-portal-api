const {
  sequelize,
  User,
  StudentInformation,
  Address,
  BasicEducation,
  TertiaryEducation,
  ProfessionalSkill,
  EmployerFilter,
  Document,
  LearnerProgramme,
  Programme,
  CertificateAndTraning
} = require("../models");
const {
  generateJWT,
  SESSION_COOKIE_OPTIONS,
  REFRESH_SESSION_COOKIE_OPTIONS,
  verifyJWT
} = require("../utils/Helper");
const { ApiError, ApiResp } = require("../utils/Response");
const bcryptjs = require("bcryptjs");

/**
 * @Athor Themba Makamu
 * @Date 13 June 2023
 * @Time 17:32
 * @controller - controller associated with authentications
 */

const AuthController = {
  signInUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email }, raw: true });

      if (!user)
        throw new ApiError("User email don't exist, please register", 404);

      const isValid = await bcryptjs.compare(password, user.password);

      if (!isValid) throw new ApiError("user credentials invalid", 404);

      const payload = {
        id: user.id,
        email: user.email,
        userType: user.userType
      };

      const token = generateJWT(payload, process.env.JWT_ACCESS_KEY, "1h"); // expires in 1 hour

      const refreshToken = generateJWT(
        payload,
        process.env.JWT_REFRESH_KEY,
        "31d"
      ); // expires in 31 days

      return res.status(200).json(
        ApiResp("User logged in successfully", "user", {
          token: token
        })
      );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  /**
   * @method signUpUser
   * @description function to register new user // usually students
   * @return : return user created and token
   * @param ['userInfo', 'email', 'password']
   */

  signUpUser: async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      if (req.body?.email === "") throw new ApiError("Email is required", 422);

      if (req.body?.identificationNumber === "") {
        throw new ApiError("Identification number required", 422);
      }

      // check if email exist
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (user) {
        throw new ApiError("User email already taken", 409);
      }

      // check if Id number already registered
      const id = await StudentInformation.findOne({
        where: {
          identificationNumber: req.body.identificationNumber
        }
      });

      if (id) {
        throw new ApiError(
          "User id number already registered, please try reset password",
          409
        );
      }

      // if everything is fine register user
      const password = await bcryptjs.hash(
        req.body.password,
        await bcryptjs.genSalt(10)
      );
      const usr = await User.create(
        { ...req.body, password: password },
        { transaction: t }
      );
      await StudentInformation.create(
        { identificationNumber: req.body.identificationNumber, userId: usr.id },
        { transaction: t }
      );

      await t.commit();

      return res
        .status(201)
        .json(ApiResp("User created successfully", "user", usr));
    } catch (e) {
      console.log(e);
      await t.rollback();
      next(e);
    }
  },

  isUserLoggedIn: async (req, res, next) => {
    try {
      const user = req.user;

      let usr = null;

      if (user.userType === "super") {
        usr = await User.findOne({
          where: {
            id: user.id
          },
          attributes: {
            exclude: ["password"]
          },
          raw: true,
          nested: true
        });
      }

      if (user.userType === "employer") {
        usr = await User.findOne({
          where: {
            id: user.id
          },
          attributes: {
            exclude: ["password"]
          },
          include: [
            {
              model: EmployerFilter,
              as: "filters"
            }
          ]
        });
      }

      if (user.userType === "student") {
        usr = await User.findOne({
          where: {
            id: user.id
          },
          attributes: {
            exclude: ["password"]
          },
          include: [
            {
              model: StudentInformation,
              as: "studentInformation"
            },
            {
              model: Address,
              as: "studentAddress"
            },
            {
              model: BasicEducation,
              as: "basicEducation"
            },
            {
              model: TertiaryEducation,
              as: "tertiaryEducation"
            },
            {
              model: ProfessionalSkill,
              as: "skills"
            },
            {
              model: LearnerProgramme,
              as: "studentProgrammes",
              include: [
                {
                  model: Programme,
                  as: "programmes"
                }
              ]
            },
            {
              model: CertificateAndTraning,
              as: "certificates"
            },
            {
              model: Document,
              as: "attachments"
            }
          ]
        });
      }

      return res.status(200).json({
        success: true,
        user: usr
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  refreshToken: (req, res, next) => {
    try {
      const refreshToken = req.cookies[process.env.COOKIE_REFRESH_TOKEN];

      if (!refreshToken) throw new ApiError("User refresh token expired", 401);

      const user = verifyJWT(refreshToken, process.env.JWT_REFRESH_KEY);

      if (!user) throw new ApiError("Invalid user token", 401);

      delete user.iat;
      delete user.exp;

      const token = generateJWT(user, process.env.JWT_ACCESS_KEY, "1h");

      res.cookie(
        process.env.COOKIE_ACCESS_TOKEN,
        token,
        process.env.COOKIE_ACCESS_TOKEN
      );

      res
        .status(200)
        .json(ApiResp("User token refreshed successfully", "token", token));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  resetPasswordUser: (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "Reset Password User"
    });
  }
};

module.exports = AuthController;
