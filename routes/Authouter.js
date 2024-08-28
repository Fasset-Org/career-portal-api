const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const AuthMid = require("../middlewares/AuthMid");

const AuthRouter = Router();

AuthRouter.post("/login", AuthController.signInUser);
AuthRouter.post("/register", AuthController.signUpUser);
AuthRouter.post('/resetPassword', AuthController.resetPasswordUser)
AuthRouter.get('/isUserLoggedIn', AuthMid, AuthController.isUserLoggedIn)
AuthRouter.get('/refreshToken', AuthController.refreshToken)
AuthRouter.post('/forgotPassword', AuthController.sendResetPasswordEmail)
AuthRouter.get('/verifyResetToken/:token', AuthController.verifyResetPasswordToken)
AuthRouter.post('/resetPassword', AuthController.resetPasswordUser);



module.exports = AuthRouter;