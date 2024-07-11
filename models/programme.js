"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Programme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ LearnerProgramme }) {
      // define association here
      this.hasMany(LearnerProgramme, {
        foreignKey: "programmeId"
      });
    }
  }
  Programme.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
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
    },
    {
      sequelize,
      modelName: "Programme",
      tableName: "programmes",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated"
    }
  );
  return Programme;
};
