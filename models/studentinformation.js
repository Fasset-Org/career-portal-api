"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: "userId"
      });
    }
  }
  StudentInformation.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      rsaId: {
        type: DataTypes.TEXT
      },
      identificationNumber: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      passportNumber: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      disbility: {
        type: DataTypes.TEXT
        // allowNull: false,
      },
      careerStatus: {
        type: DataTypes.TEXT
        // allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.TEXT
        // allowNull: false,
      },
      race: {
        type: DataTypes.TEXT
        // allowNull: false,
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
    },
    {
      sequelize,
      modelName: "StudentInformation",
      tableName: "studentInformations",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated"
    }
  );
  return StudentInformation;
};
