const { Op } = require("sequelize");
const {
  Address,
  sequelize,
  User,
  StudentInformation,
  BasicEducation,
  TertiaryEducation,
  ProfessionalSkill,
  CertificateAndTraning,
  Document,
  Programme,
  LearnerProgramme
} = require("../models");
const { ApiError, ApiResp } = require("../utils/Response");
const { v4: uuid } = require("uuid");

const StudentController = {
  editStudentBasicInformation: async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      const { userId } = req.params;

      const user = await User.findOne(
        { where: { id: userId } },
        { transaction: t }
      );
      const studentInfo = await StudentInformation.findOne(
        { where: { userId: userId } },
        { transaction: t }
      );

      if (!user || !studentInfo)
        throw new ApiError("Error saving user basic information", 404);

      await user.update(
        {
          ...req.body,
          profileProgress: !studentInfo.completed
            ? parseInt(user.profileProgress) + 15
            : parseInt(user.profileProgress) + 0
        },
        { transaction: t }
      );

      await studentInfo.update(
        { ...req.body, completed: true },
        { transaction: t }
      );

      await t.commit();

      return res
        .status(200)
        .json(ApiResp("User basic information updated successfully"));
    } catch (e) {
      console.log(e);
      await t.rollback();
      next(e);
    }
  },

  addStudentAddress: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const user = await User.findOne(
        { where: { id: req.user.id } },
        { transaction: t }
      );

      const address = await Address.create(
        { ...req.body, userId: req.user.id },
        { transaction: t }
      );

      if (!address) throw new ApiError("Error saving address", 404);

      await user.update(
        { profileProgress: parseInt(user.profileProgress) + 20 },
        { transaction: t }
      );

      t.commit();

      return res.status(201).json(ApiResp("Address saved successfully"));
    } catch (e) {
      console.log(e);
      t.rollback();
      next(e);
    }
  },

  editStudentAddress: async (req, res, next) => {
    try {
      const { addressId } = req.params;

      const address = await Address.findOne({
        where: { [Op.and]: [{ id: addressId }, { userId: req.user.id }] }
      });

      if (!address) throw new ApiError("Address edit error", 404);

      await address.update({ ...req.body });

      return res.status(200).json(ApiResp("Address updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addBasicEducation: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const user = await User.findOne(
        { where: { id: req.user.id } },
        { transaction: t }
      );
      const basicEducation = await BasicEducation.create(
        {
          ...req.body,
          completed: true
        },
        { transaction: t }
      );

      if (!basicEducation || !user)
        throw new ApiError("Error saving basic aducation info", 404);

      await user.update(
        { profileProgress: parseInt(user.profileProgress) + 15 },
        { transaction: t }
      );

      t.commit();

      return res
        .status(201)
        .json(ApiResp("Basic education saved successfully"));
    } catch (e) {
      console.log(e);
      t.rollback();
      next(e);
    }
  },

  editBasicEducation: async (req, res, next) => {
    try {
      const { basicEducationId } = req.params;

      const basicEducation = await BasicEducation.findOne({
        where: { id: basicEducationId }
      });

      if (!basicEducation)
        throw new ApiError("Error updating basic education info", 404);

      await basicEducation.update({ ...req.body });

      return res
        .status(200)
        .json(ApiResp("Basic education info updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addTertiaryEducation: async (req, res, next) => {
    try {
      await TertiaryEducation.create({ ...req.body });

      return res
        .status(201)
        .json(ApiResp("Tertiary education info saved successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editTertiaryEducation: async (req, res, next) => {
    try {
      const { tertiaryEducationId } = req.params;

      const tertiaryEducation = await TertiaryEducation.findOne({
        where: { id: tertiaryEducationId }
      });

      if (!tertiaryEducation)
        throw new ApiError("Error updating tertiary education info");

      await tertiaryEducation.update({ ...req.body });

      return res
        .status(200)
        .json(ApiResp("Tertiary education info updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deleteTertiaryEducation: async (req, res, next) => {
    try {
      const { tertiaryEducationId } = req.params;

      await TertiaryEducation.destroy({ where: { id: tertiaryEducationId } });

      return res.status(200).json(ApiResp("Record deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addProfessionalSkill: async (req, res, next) => {
    try {
      const professionalSkill = await ProfessionalSkill.create({ ...req.body });

      if (!professionalSkill)
        throw new ApiError("Error saving professional skill", 404);

      return res
        .status(201)
        .json(ApiResp("Professional skill saved successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editProfessionalSkill: async (req, res, next) => {
    try {
      const { professionalSkillId } = req.params;

      const professionalSkill = await ProfessionalSkill.findOne({
        where: { id: professionalSkillId }
      });

      if (!professionalSkill)
        throw new ApiError("Error updating professional skill", 404);

      await professionalSkill.update({ ...req.body });

      return res
        .status(200)
        .json(ApiResp("Professional skill update successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deleteProfessionalSkill: async (req, res, next) => {
    try {
      const { professionalSkillId } = req.params;

      await ProfessionalSkill.destroy({ where: { id: professionalSkillId } });

      return res
        .status(200)
        .json(ApiResp("Professional skill deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addCertification: async (req, res, next) => {
    try {
      const files = req.files;

      let certificateFile = "";
      let certificateNewFile = "";

      if (files) {
        certificateFile = files.certificateFile;
        const fileExt = certificateFile.name.split(".")[1];
        certificateNewFile = `${uuid()}.${fileExt}`;
        certificateFile.mv(
          `${process.env.STUDENT_DOC_FOLDER}/${certificateNewFile}`
        );
      }

      await CertificateAndTraning.create({
        ...req.body,
        certificateFileName: certificateNewFile,
        originalFileName: certificateFile.name
      });

      return res.status(201).json(ApiResp("Certificate added successfully"));
    } catch (e) {
      console.log(e);
    }
  },

  editCertification: async (req, res, next) => {
    console.log(req.body);
    try {
      const { certificateId } = req.body;

      const certificate = await CertificateAndTraning.findOne({
        where: { id: certificateId }
      });

      if (!certificate)
        throw new ApiError("Error updating certificate information", 404);

      const files = req.files;

      let certificateFile = "";
      let certificateNewFile = "";
      let originalFileName = "";

      if (files) {
        certificateFile = files.certificateFile;
        const fileExt = certificateFile.name.split(".")[1];
        certificateNewFile = `${uuid()}.${fileExt}`;
        originalFileName = certificateNewFile.name;
        certificateFile.mv(
          `${process.env.STUDENT_DOC_FOLDER}/${certificateNewFile}`
        );
      } else {
        certificateNewFile = req.body.certificateFile;
        certificateFile = req.body.originalFileName;
      }

      await certificate.update({
        ...req.body,
        certificateFileName: certificateNewFile,
        originalFileName: originalFileName
      });

      return res.status(200).json(ApiResp("Certificate updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deleteCertification: async (req, res, next) => {
    try {
      const { certificateId } = req.params;

      await CertificateAndTraning.destroy({ where: { id: certificateId } });

      return res.status(200).json(ApiResp("Certificate deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  downloadCertificate: async (req, res, next) => {
    try {
      const { filename } = req.query;
      const filePath = `${process.env.STUDENT_DOC_FOLDER}/${filename}`;

      return res.download(filePath);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error happened"
      });
    }
  },

  addDocument: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const files = req.files;
      const documentFile = files.file;
      const fileExt = documentFile.name.split(".")[1];
      const documentFileName = `${uuid()}.${fileExt}`;

      const save = documentFile.mv(
        `${process.env.STUDENT_CERTIFICATE_FOLDER}/${documentFileName}`
      );

      if (!save) throw new ApiError("Error uploading document", 400);

      await Document.create(
        {
          ...req.body,
          originalFileName: documentFile.name,
          blobFileName: documentFileName
        },
        { transaction: t }
      );

      const documents = await Document.findAll(
        { where: { userId: req.user.id } },
        { transaction: t }
      );

      const user = await User.findOne(
        { where: { id: req.user.id } },
        { transaction: t }
      );

      await user.update(
        {
          profileProgress:
            documents.length < 3
              ? parseInt(user.profileProgress) + 5
              : parseInt(user.profileProgress) + 0
        },
        { transaction: t }
      );

      t.commit();

      return res.status(201).json(ApiResp("Document added successfully"));
    } catch (e) {
      console.log(e);
      t.rollback();
      next(e);
    }
  },

  getAllProgrammes: async (req, res, next) => {
    try {
      const programmes = await Programme.findAll();

      return res
        .status(200)
        .json(
          ApiResp("Programmes fetched successfully", "programmes", programmes)
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  saveLearnerProgrammes: async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
      const { programmes, userId } = req.body;

      const user = await User.findOne(
        { where: { id: userId } },
        { transaction: t }
      );

      await LearnerProgramme.destroy(
        { where: { userId: userId } },
        { transaction: t }
      );

      for (const programme of programmes) {
        await LearnerProgramme.create(
          {
            programmeId: programme.id,
            userId: userId
          },
          { transaction: t }
        );
      }

      if (!req.body.completed) {
        await user.update(
          { profileProgress: parseInt(user.profileProgress) + 15 },
          { transaction: t }
        );
      }

      t.commit();

      return res.status(201).json(ApiResp("Interest saved successfully"));
    } catch (e) {
      console.log(e);
      t.rollback();
      next(e);
    }
  }

  // getAllLearnerProgrammes: async (req, res, next) => {

  //   try{

  //   }catch(e){
  //     console.log(e);
  //     next(e);
  //   }

  // }

  // getAllCertification: async (req, res, next) => {
  //   try {
  //     const certificates = await CertificateAndTraning.findAll();

  //     return res
  //       .status(200)
  //       .json(ApiResp("Certificates fetched", "certificates", certificates));
  //   } catch (e) {
  //     console.log(e);
  //     next(e);
  //   }
  // }
};

module.exports = StudentController;
