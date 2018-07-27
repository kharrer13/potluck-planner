const db = require('../models');

db.sequelize.sync()
  .then(function () {
    const newItems = [
      { "itemName": "birthday cake" },
      { "itemName": "treacle tart" },
      { "itemName": "sherbert lemon" },
      { "itemName": "Puking Pastilles" },
      { "itemName": "fainting fancies" },
      { "itemName": "chocolate" },
      { "itemName": "steak and kidney pie" },
      { "itemName": "cauldron cakes" },
      { "itemName": "bouillabaisse" },
      { "itemName": "pumpkin pasties" },
      { "itemName": "chocolate frogs" },
      { "itemName": "corned beef sandwich" },
      { "itemName": "bertie bott's every flavor beans" },
      { "itemName": "rock cake" },
      { "itemName": "radish salad" },
      { "itemName": "butterbeer" },
      { "itemName": "pumpkin beer" },
      { "itemName": "boiled potatoes" },
      { "itemName": "lamb chops" },
      { "itemName": "Yorkshire pudding" },
      { "itemName": "bacon and steak" },
      { "itemName": "roast beef" },
      { "itemName": "bread" }
    ]
    db.Item.bulkCreate(newItems)
      // .then(() => db.Item.findAll())
      .then((dbItems) => console.log(JSON.stringify(dbItems, '', 2)))
    .then(() => db.sequelize.close())
    .catch((err) => console.error(err.message));
  })

