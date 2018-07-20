'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [
      {
        "itemName": "birthday cake"
      },
      {
        "itemName": "treacle tart"
      },
      {
        "itemName": "sherbert lemon"
      },
      {
        "itemName": "Puking Pastilles"
      },
      {
        "itemName": "fainting fancies"
      },
      {
        "itemName": "chocolate"
      },
      {
        "itemName": "steak and kidney pie"
      },
      {
        "itemName": "cauldron cakes"
      },
      {
        "itemName": "bouillabaisse"
      },
      {
        "itemName": "pumpkin pasties"
      },
      {
        "itemName": "chocolate frogs"
      },
      {
        "itemName": "corned beef sandwich"
      },
      {
        "itemName": "bertie bott's every flavor beans"
      },
      {
        "itemName": "rock cake"
      },
      {
        "itemName": "radish salad"
      },
      {
        "itemName": "butterbeer"
      },
      {
        "itemName": "pumpkin beer"
      },
      {
        "itemName": "boiled potatoes"
      },
      {
        "itemName": "lamb chops"
      },
      {
        "itemName": "Yorkshire pudding"
      },
      {
        "itemName": "bacon and steak"
      },
      {
        "itemName": "roast beef"
      },
      {
        "itemName": "bread"
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
    return queryInterface.bulkDelete('Items', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
