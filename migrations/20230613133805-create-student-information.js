"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("studentInformations", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      identificationNumber: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      disbility: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },
      careerStatus: {
        type: DataTypes.TEXT
        // allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },
      race: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      completed:{
        type: DataTypes.BOOLEAN,
      },
      dateCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      dateUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("studentInformations");
  },
};
