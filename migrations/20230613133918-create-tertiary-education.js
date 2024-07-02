"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("tertiaryEducations", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      educationLevel: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fieldOfStudy: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      institution: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      startYear: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      endYear: {
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("tertiaryEducations");
  }
};
