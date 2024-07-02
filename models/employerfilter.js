"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployerFilter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  EmployerFilter.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    },
    {
      sequelize,
      modelName: "EmployerFilter",
      tableName: "employerFilters",
      timestamps: true,
      createdAt: "dateCreated",
      updatedAt: "dateUpdated",
    }
  );
  return EmployerFilter;
};
