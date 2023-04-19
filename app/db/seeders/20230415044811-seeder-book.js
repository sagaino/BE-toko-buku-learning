"use strict";

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          // id: uuidv4(),
          title: "David Bach: Faktor Latte",
          author: "David Bach",
          image: "/uploads/image 1.png",
          published: new Date(),
          price: 90,
          stock: 100,
          user: "1",
          category: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: uuidv4(),
          title: '"Selena" dan "Nebula"',
          author: "TERE LIYE",
          image: "/uploads/image 2.png",
          published: new Date(),
          price: 90,
          stock: 100,
          user: "1",
          category: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: uuidv4(),
          title: "Pelukis Bisu (The Silent Patient)",
          author: "Alex Michaelides",
          image: "/uploads/image 3.png",
          published: new Date(),
          price: 90,
          stock: 100,
          user: "1",
          category: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: uuidv4(),
          title: "Kecamuk Darah (Troubled Blood)",
          author: "Robert Galbraith",
          image: "/uploads/image 4.png",
          published: new Date(),
          price: 90,
          stock: 100,
          user: "1",
          category: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: uuidv4(),
          title: "Kitab Kawin (Edisi Cover Baru)",
          author: " Laksmi Pamuntjak",
          image: "/uploads/image 5.png",
          published: new Date(),
          price: 90,
          stock: 100,
          user: "1",
          category: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          // id: uuidv4(),
          title: "Salvation of a Saint",
          author: "Keigo Higashino",
          image: "/uploads/image 6.png",
          published: new Date(),
          price: 90,
          stock: 100,
          user: "1",
          category: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books", null, {});
  },
};