const { Router } = require("express");
const AuthMid = require("../middlewares/AuthMid");
const {
  addLearnerProgrammes,
  getAllStudents
} = require("../controllers/AdminController");
const { authorize } = require("../middlewares/authorize");

const AdminRouter = Router();

AdminRouter.post("/learnerProgramme", AuthMid, authorize("admin"), addLearnerProgrammes);
AdminRouter.get("/getAllStudents", AuthMid, authorize("admin"), getAllStudents);

module.exports = AdminRouter;
