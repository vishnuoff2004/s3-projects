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
    */
    await queryInterface.bulkInsert('services', [{
      service_name: 'electrician',
      description:'i am an electrician',
      price:1000,
      duration:"24hrs",
      createdAt: new Date(),
      updatedAt: new Date()
    },
 {
      service_name: 'plumber',
      description:'i am a plumber',
      price:800,
      duration:"24hrs",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      service_name: 'musician',
      description:'i am a musician',
      price:1200,
      duration:"24hrs",
      createdAt: new Date(),
      updatedAt: new Date()
    } 
  ], {});
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
