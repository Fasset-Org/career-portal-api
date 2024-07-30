"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TertiaryEducation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "userId",
      });
    }
  }
  TertiaryEducation.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      educationLevel: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fieldOfStudy: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      institution: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      startYear: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      endYear: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: "TertiaryEducation",
      tableName: "tertiaryEducations",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated",
    }
  );
  return TertiaryEducation;
};
