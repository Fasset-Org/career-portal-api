const { Router } = require("express");
const AuthMid = require("../middlewares/AuthMid");
const { addLearnerProgrammes } = require("../controllers/AdminController");
const { authorize } = require("../middlewares/authorize");

const AdminRouter = Router();

AdminRouter.post(
  "/learnerProgramme",
  AuthMid,
  authorize("admin"),
  addLearnerProgrammes
);

module.exports = AdminRouter;
