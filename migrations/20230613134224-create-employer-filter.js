"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("employerFilters", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      filters: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
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
    await queryInterface.dropTable("employerFilters");
  },
};
