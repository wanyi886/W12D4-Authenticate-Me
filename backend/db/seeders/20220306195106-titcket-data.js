'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [
      {
        eventId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 16,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 16,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 7,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventId: 8,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },



], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Tickets', null, {});
  }
};
