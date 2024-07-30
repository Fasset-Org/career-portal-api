"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "programmes",
      [
        {
          id: uuidv4(),
          title: "Learnership Unemployed",
          description:
            "This is a structured learning programme which includes theoretical and practical workplace experiential learning over a period of at least 12 months and which leads to an occupationally related qualification registered on the NQF. Learners are allocated a monthly stipend for the duration of the programme.",
          duration: "12 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title:
            "Internship: HET Full Qualification (unemployed entering workplace)",
          description:
            "This is a 12 month workplace experience programme designed for candidates who have already completed an NQF Level 5 and higher qualification that is relevant for employment in the services sector, but have not yet gathered the necessary practical experience to enable them to obtain employment.",
          duration: "12 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title: "Internship: FET Part Qualification (N6)",
          description:
            "This is an 18 months’ workplace experience programme designed for candidates who have already completed an N6 qualification relevant for employment in the services sector, but have not yet gathered the necessary practical experience to enable them to obtain a National Diploma.",
          duration: "18 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title: "Internship: FET Full Qualification (NCV)",
          description:
            "This is a 12 months’ workplace experience programme designed for candidates who have already completed an NQF level 1, 2, 3 or 4 national vocational qualification that is relevant for employment in the services sector, but have not yet gathered the necessary practical experience to enable them to obtain employment.",
          duration: "12 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title:
            "Internship: Work Integrated Learning (HET Part of Qualification)",
          description:
            "This is a 12 months’ workplace experience programme designed for candidates who have already completed an NQF Level 5 and higher part-qualification relevant for employment in the services sector, but have not yet gathered the necessary practical experience to enable them to obtain the full qualification.",
          duration: "18 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title: "Bursary Employed: HET",
          description:
            "This is a grant awarded to employed learners enrolled for part qualifications or full qualifications registered on the NQF.",
          duration: "12 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title: "Learnership Employed",
          description:
            "This is a structured Learnership which includes theoretical & practical workplace experiential learning over a period of at least 12 months and leads to an occupationally related qualification registered on the NQF and up to NQF Level 5. Learners in this form of learnership programme already earn salaries and are therefore not entitled to a stipend.",
          duration: "12 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title: "Adult Education and Training",
          description:
            "Principles and processes through which the prior knowledge and skills acquired by a person are identified, mediated and assessed for purposes admission to a formal course of study, recognition and certification.",
          duration: "12 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title: "Employed Skills Programme",
          description:
            "This learning intervention has been designed to be an occupationally based, short term learning programme. When successfully completed by the learner, it constitutes credits towards a qualification registered on the NQF. The Skills Programme comprises of a cluster of unit standards derived from the same qualification.",
          duration: "12 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title: "Skills Programme Unemployed",
          description:
            "This learning intervention has been designed to be an occupationally based, short term learning programme. When successfully completed by the learner, it constitutes credits towards a qualification registered on the NQF. The Skills Programme comprises of a cluster of unit standards derived from the same qualification.",
          duration: "12 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        },
        {
          id: uuidv4(),
          title: "Candidacy",
          description:
            "This is a structured learning programme which includes theoretical and practical workplace experiential learning over a period of at least 12 months and which leads to an occupationally related qualification registered on the NQF. Learners are allocated a monthly stipend for the duration of the programme. This will lead to the entry to write the relevant professional body exam.",
          duration: "12 Months",
          dateCreated: new Date(),
          dateUpdated: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
