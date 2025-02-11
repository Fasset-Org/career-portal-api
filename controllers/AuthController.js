const { Op } = require("sequelize");
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
const sendEmail = require("../utils/sendEmail");

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

      const user = await User.findOne({ where: { email: email } });

      if (!user)
        throw new ApiError("User email don't exist, please register", 404);

      const isValid = await bcryptjs.compare(password, user.password);

      if (!isValid) throw new ApiError("User credentials invalid", 404);

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
      // check if email exist
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });

      if (user) {
        throw new ApiError("User email already taken", 409);
      }

      // check if id/passport number already registeredF
      const id = await StudentInformation.findOne({
        where: [
          { identificationNumber: req.body?.identificationNumber },
          { passportNumber: req.body?.passportNumber }
        ]
      });

      if (id) {
        throw new ApiError(
          "User id/passport number already registered, please try reset password",
          409
        );
      }

      // if everything is fine register user
      const password = await bcryptjs.hash(
        req.body.password,
        await bcryptjs.genSalt(10)
      );
      const usr = await User.create(
        {
          ...req.body,
          password: password,
          profileProgress: 20,
          status: "active"
        },
        { transaction: t }
      );
      await StudentInformation.create(
        { ...req.body, userId: usr.id },
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

      if (user.userType === "admin") {
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

  sendResetPasswordEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({
        where: { email: email },
        exclude: "password"
      });

      if (!user)
        throw new ApiError("User email does not exist, please register");

      const resetPasswordToken = generateJWT(
        { email: req.body.email },
        process.env.JWT_RESET_KEY,
        `1d`
      );

      const html = `
  <div style="width: 100%; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 0px; padding: 20px; font-family: Arial, sans-serif;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="color: #163683; font-size: 24px; font-weight: bold; margin: 0;">Password Reset Request</h2>
      <img src="${
        process.env.API_URL
      }/uploads/blueLogo-transparentBg.png" alt="Logo" height="150px" width="150px" style="margin-top: 20px;" />
    </div>
    
    <div style="margin-bottom: 20px;">
      <p style="font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 10px;">
        Dear <b>${user.firstName} ${user.lastName}</b>,
      </p>
      <p style="font-size: 14px; color: #333; line-height: 1.6; margin-bottom: 20px;">
        You have submitted a password change request. Please click the button below to reset your password.
      </p>
    </div>

    <div style="text-align: center; margin-bottom: 20px;">
      <a href="${process.env.APP_URL}/resetPassword/${resetPasswordToken}" 
        style="background-color: #163683; color: white; padding: 12px 24px; font-size: 16px; font-weight: bold; text-align: center; text-decoration: none; display: inline-block; border-radius: 0px; transition: background-color 0.3s;">
        RESET PASSWORD
      </a>
    </div>

    <div style="margin-bottom: 20px;">
      <p style="font-size: 14px; color: #555; line-height: 1.6;">
        If you don’t use this link within 7 hours, it will expire. To get a new password reset link, visit: 
        <a href="${
          process.env.APP_URL
        }/forgotPassword" style="color: #163683; text-decoration: none;">${
        process.env.APP_URL
      }/forgotPassword</a>
      </p>
      <p style="font-size: 14px; color: #555; line-height: 1.6; margin-top: 20px;">
        Thanks,<br />
        The FASSET Team
      </p>
    </div>

    <div style="margin-top: 40px;">
      <p style="font-size: 14px; color: #777; text-align: center;">
        If you did not request this, please ignore this email.
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
    
    <p style="font-size: 12px; color: #999; text-align: center;">
      © ${new Date().getFullYear()} FASSET. All rights reserved.
    </p>
  </div>
`;

      sendEmail({
        email: user.email,
        subject: "Password Reset | Learner Portal",
        html: html
      });

      return res
        .status(200)
        .json(ApiResp("Please check your email for reset password link"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  verifyResetPasswordToken: async (req, res, next) => {
    try {
      const { token } = req.params;

      const claims = verifyJWT(token, process.env.JWT_RESET_KEY);

      return res
        .status(200)
        .json(ApiResp("Reset link verified successfully", "user", claims));
    } catch (e) {
      console.log(e);
      next(new ApiError("Reset link invalid or expired", 400));
    }
  },

  resetPasswordUser: async (req, res, next) => {
    try {
      const { password, email } = req.body;

      const user = await User.findOne({ where: { email: email } });

      if (!user) throw new ApiError("User email does not exist", 404);

      await user.update({
        password: await bcryptjs.hash(password, await bcryptjs.genSalt(10))
      });

      res.status(200).json({
        success: true,
        message: "Your password was reset successfully, you can now login"
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deleteAccount: async (req, res, next) => {
    try {
      const { userId } = req.params;

      console.log(req.body);
      const { password } = req.body;

      const user = await User.findOne({ where: { id: userId } });

      if (!user) throw new ApiError("Your account does not exist", 404);

      const isValid = await bcryptjs.compare(password, user.password);

      if (!isValid)
        throw new ApiError(
          "Please provide correct password to delete your account",
          404
        );

      await User.destroy({ where: { id: userId } });
      await StudentInformation.destroy({ where: { userId: userId } });

      return res.status(200).json(ApiResp("User deteled successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};

module.exports = AuthController;
