"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("certificateAndTranings", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      course: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      year: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      originalFileName: {
        type: DataTypes.TEXT
      },
      certificateFileName: {
        type: DataTypes.TEXT
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
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
    await queryInterface.dropTable("certificateAndTranings");
  }
};
