"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("programmes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      duration: {
        type: DataTypes.TEXT,
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
    await queryInterface.dropTable("programmes");
  }
};
