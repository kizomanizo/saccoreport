'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    uuid: DataTypes.STRING,
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {type: Sequelize.STRING, allowNull: false, defaultValue: "example@kikobachetu.com"},
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    lastLogin: {type: Sequelize.DATE, allowNull: true},
    createdBy: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};