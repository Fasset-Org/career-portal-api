"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LearnerProgramme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Programme }) {
      // define association here

      this.belongsTo(User, {
        foreignKey: "userId",
      });

      this.belongsTo(Programme, {
        foreignKey: "programmeId",
        as: "programmes",
      });
    }
  }
  LearnerProgramme.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      programmeId: {
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
    },
    {
      sequelize,
      modelName: "LearnerProgramme",
      tableName: "learnerProgrammes",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated",
    }
  );
  return LearnerProgramme;
};
