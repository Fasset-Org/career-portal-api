const { Router } = require("express");
const AuthRouter = require("./Authouter");
const StudentRouter = require("./StudentRouter");
const AdminRouter = require("./AdminRouter");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/student", StudentRouter);
AppRouter.use('/admin', AdminRouter);

module.exports = AppRouter;
