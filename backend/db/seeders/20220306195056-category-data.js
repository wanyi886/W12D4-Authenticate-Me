'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Categories', [
      {
        type: "Business",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Charity",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Community",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Food & Drink",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Film & Media",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Performing & Visual Art",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Music",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Sports & Fitness",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "Travel & Outdoor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
   ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});

  }
};
