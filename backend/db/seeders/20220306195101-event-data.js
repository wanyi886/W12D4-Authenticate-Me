'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Events', [
      {
        hostId: 1,
        categoryId: 7,
        title:'Soundgasm San Jose',
        description:'Have fun with us!! Dress Code: Sexy, Swaggy & Sophisticated.',
        imgUrl:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F237069949%2F232815302468%2F1%2Foriginal.20220226-014351?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C686%2C3648%2C1824&s=4661f4c6d9f68b214675563145875c33',
        price: 0,
        date: "2022-04-22",
        startTime:'13:30',
        endTime:'16:30',
        address: '32 South 3rd Street',
        city:'San Jose',
        state:'CA',
        zipCode:'95113',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hostId: 1,
        categoryId: 8,
        title: 'Official Nicky Jam Concert After Party',
        description: 'The best After Party ever! This event will sell out, hurry!!',
        imgUrl:'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F239125839%2F202130416373%2F1%2Foriginal.20220301-221848?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C335%2C1024%2C512&s=cfb7b515ccb572835e98e82f268643ba',
        price: 15,
        date: '2022-05-13',
        startTime:'13:30',
        endTime:'16:30',
        address:'58 South First Street',
        city:'San Jose',
        state:'CA',
        zipCode:'95113',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Events', null, {});

  }
};
