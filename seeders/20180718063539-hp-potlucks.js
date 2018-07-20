'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Potlucks', [
      {
        "eventName": "Train to school",
        "eventLocation": "Hogwarts Express",
        "privateEvent": true
      },
      {
        "eventName": "Quidditch World Cup",
        "eventLocation": "Dartmoor",
        "privateEvent": false
      },
      {
        "eventName": "Fleur and Bill's wedding",
        "eventLocation": "The Burrow",
        "privateEvent": true
      },
      {
        "eventName": "Quidditch season opener",
        "eventLocation": "Great Hall",
        "privateEvent": false
      },
      {
        "eventName": "Welcoming Feast",
        "eventLocation": "Great Hall",
        "privateEvent": false
      }
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Potlucks', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
