const { Router } = require("express");
const AuthRouter = require("./Authouter");
const StudentRouter = require("./StudentRouter");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/student", StudentRouter);

module.exports = AppRouter;
