"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("learnerProgrammes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      programmeId: {
        type: DataTypes.UUID
        // allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN
      },
      dateCreated: {
        allowNull: false,
        type: DataTypes.DATE
      },
      dateUpdated: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("learnerProgrammes");
  }
};
