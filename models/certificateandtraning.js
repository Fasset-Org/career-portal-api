"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CertificateAndTraning extends Model {
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
  CertificateAndTraning.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
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
    },
    {
      sequelize,
      modelName: "CertificateAndTraning",
      tableName: "certificateAndTranings",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated"
    }
  );
  return CertificateAndTraning;
};
