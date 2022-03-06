'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Categories', [
      { type: "Business" },
      { type: "Charity" },
      { type: "Community" },
      { type: "Food & Drink" },
      { type: "Film & Media" },
      { type: "Performing & Visual Art" },
      { type: "Music" },
      { type: "Sports & Fitness" },
      { type: "Travel & Outdoor" },
   ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});

  }
};
