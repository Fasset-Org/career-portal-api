const { Router } = require('express');
const StudentController = require('../controllers/StudentController');
const AuthMid = require('../middlewares/AuthMid');

const StudentRouter = Router();

StudentRouter.post('/addAddress', AuthMid, StudentController.addStudentAddress);
StudentRouter.put('/editAddress/:addressId', AuthMid, StudentController.editStudentAddress);
StudentRouter.put('/editBasicInformation/:userId', AuthMid, StudentController.editStudentBasicInformation);
StudentRouter.post('/addBasicEducation', AuthMid, StudentController.addBasicEducation);
StudentRouter.put('/editBasicEducation/:basicEducationId', AuthMid, StudentController.editBasicEducation);
StudentRouter.post('/addTertiaryEducation', AuthMid, StudentController.addTertiaryEducation);
StudentRouter.put('/editTertiaryEducation/:tertiaryEducationId', AuthMid, StudentController.editTertiaryEducation);
StudentRouter.delete('/deleteTertiaryEducation/:tertiaryEducationId', AuthMid, StudentController.deleteTertiaryEducation);
StudentRouter.post('/addProfessionalSkill', AuthMid, StudentController.addProfessionalSkill);
StudentRouter.put('/editProfessionalSkill/:professionalSkillId', AuthMid, StudentController.editProfessionalSkill);
StudentRouter.delete('/deleteProfessionalSkill/:professionalSkillId', AuthMid, StudentController.deleteProfessionalSkill);
StudentRouter.post('/addCertification', AuthMid, StudentController.addCertification);
StudentRouter.put('/editCertificate', AuthMid, StudentController.editCertification);
StudentRouter.delete('/deleteCertificate/:certificateId', AuthMid, StudentController.deleteCertification);
StudentRouter.get('/downloadCertificate', StudentController.downloadCertificate);
StudentRouter.post('/addDocument', AuthMid, StudentController.addDocument);
StudentRouter.get('/getAllProgrammes', AuthMid, StudentController.getAllProgrammes);
StudentRouter.post('/saveLearnerProgrammes', AuthMid, StudentController.saveLearnerProgrammes);

module.exports = StudentRouter;