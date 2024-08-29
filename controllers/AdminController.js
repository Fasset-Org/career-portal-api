const {
  LearnerProgramme,
  User,
  StudentInformation,
  Address,
  BasicEducation,
  TertiaryEducation,
  ProfessionalSkill,
  Programme,
  CertificateAndTraning,
  Document
} = require("../models");
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
  },

  getAllStudents: async (req, res, next) => {
    try {
      const students = await User.findAll({
        where: { userType: "student" },
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
            as: "studentAddress",
            attributes: {
              exclude: [
                "id",
                "dateCreated",
                "dateUpdated",
                "userId",
                "completed"
              ]
            }
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

      return res
        .status(200)
        .json(ApiResp("All students fetched", "students", students));
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};

module.exports = AdminController;
