const { LearnerProgramme } = require("../models");
const { ApiResp } = require("../utils/Response");

const AdminController = {
  addLearnerProgrammes: async (req, res, next) => {
    try {
      await LearnerProgramme.create({ ...req.body });

      return res
        .status(201)
        .json(ApiResp("Learner programme created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};

module.exports = AdminController;
