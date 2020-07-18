'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dump extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Dump.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    uuid: DataTypes.STRING,
    memberNumber: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    transaction: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    fileName: DataTypes.STRING,
    status: DataTypes.TINYINT,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dump',
  });
  return Dump;
};