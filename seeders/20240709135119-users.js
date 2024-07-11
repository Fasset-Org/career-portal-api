"use strict";
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");

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
      "users",
      [
        {
          id: uuidv4(),
          firstName: "ICT",
          lastName: "Admin",
          email: "devsupport@fasset.org.za",
          password: await bcryptjs.hash(
            "@Password123",
            await bcryptjs.genSalt(10)
          ),
          userType: 'admin',
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
