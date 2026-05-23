'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     *
    */

    await queryInterface.bulkInsert("users",[
      {
      id:'1',
      name:'vishnu',
      email:'121232@gmail.com',
      createdAt:new Date(),
      updatedAt:new Date(),
      contact:12323434,
      password:'123'
    },
          {
      id:'2',
      name:'hi',
      email:'1212rg32@gmail.com',
      createdAt:new Date(),
      updatedAt:new Date(),
      contact:12323434,
      password:'123'
    },
          {
      id:'3',
      name:'bye',
      email:'12133232@gmail.com',
      createdAt:new Date(),
      updatedAt:new Date(),
      contact:12323434,
      password:'123'
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
