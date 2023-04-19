"use strict";

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          // id: uuidv4(),
          name: "Business & Economics",
          user: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: uuidv4(),
          name: "Art & Design",
          user: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: uuidv4(),
          name: "Agriculture",
          user: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};