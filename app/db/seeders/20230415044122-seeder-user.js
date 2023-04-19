"use strict";
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = bcrypt.hashSync("12345", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          // id: uuidv4(),
          name: "John Doe",
          email: "admin@gmail.com",
          password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: uuidv4(),
          name: "ino",
          email: "ino@gmail.com",
          password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};