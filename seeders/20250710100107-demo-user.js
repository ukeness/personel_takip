'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users",[
      {
        username: "enesk",
        password: "12345",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "muhammet",
        password: "12345",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "ibrahim",
        password: "12345",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "taner",
        password: "12345",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "faruk",
        password: "12345",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
