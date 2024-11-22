"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      TertiaryEducation,
      BasicEducation,
      ProfessionalSkill,
      Address,
      CertificateAndTraning,
      Document,
      EmployerFilter,
      LearnerProgramme,
      StudentInformation
    }) {
      // define association here

      this.hasOne(StudentInformation, {
        foreignKey: "userId",
        as: "studentInformation"
      });

      this.hasOne(Address, {
        foreignKey: "userId",
        as: "studentAddress"
      });

      this.hasOne(BasicEducation, {
        foreignKey: "userId",
        as: "basicEducation"
      });

      this.hasMany(TertiaryEducation, {
        foreignKey: "userId",
        as: "tertiaryEducation"
      });

      this.hasMany(ProfessionalSkill, {
        foreignKey: "userId",
        as: "skills"
      });

      this.hasMany(CertificateAndTraning, {
        foreignKey: "userId",
        as: "certificates"
      });
      this.hasMany(Document, {
        foreignKey: "userId",
        as: "attachments"
      });

      this.hasMany(LearnerProgramme, {
        foreignKey: "userId",
        as: "studentProgrammes"
      });

      this.hasMany(EmployerFilter, {
        foreignKey: "userId",
        as: "filters"
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      middleName: {
        type: DataTypes.TEXT
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userType: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      profileProgress: {
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.TEXT
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
      modelName: "User",
      tableName: "users",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated"
    }
  );
  return User;
};
