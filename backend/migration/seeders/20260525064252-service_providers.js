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
      await queryInterface.bulkInsert('service_providers', [
        {
          name:'vishnu',
          phone:8148929450,
          isAvailable:false,
          skill_type:1,
          createdAt: new Date(),
          updatedAt: new Date()
      },
              {
          name:'hari krishnan',
          phone:8148929450,
          isAvailable:true,
          skill_type:2,
          createdAt: new Date(),
          updatedAt: new Date()
      },        {
          name:'praveen sk',
          phone:8148929450,
          isAvailable:true,
          skill_type:3,
          createdAt: new Date(),
          updatedAt: new Date()
      },
    ], {})
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
