const bcrypt = require('bcryptjs');
'use strict';

const { uuid } = require('uuidv4');
const plainPassword = "DAUser123";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      uuid: uuid(),
      fullName: "Demo Admin User",
      username: "DAUser",
      password: bcrypt.hashSync("DAUser", salt),
      salt: salt,
      createdBy: 1,
      status: true, 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {}),

    await queryInterface.bulkInsert('Users', [{
      uuid: uuid(),
      fullName: "Second Admin User",
      username: "SAUser",
      password: bcrypt.hashSync("SAUser", salt),
      salt: salt,
      createdBy: 1,
      status: true, 
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },
          
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
