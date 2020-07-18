'use strict';
const { uuid } = require('uuidv4');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dumps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: uuid(),
      },
      memberNumber: {
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      transaction: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      fileName: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Dumps');
  }
};