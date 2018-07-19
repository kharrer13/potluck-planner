const db = require('../models');

db.sequelize.sync()
  .then(function () {
    const newItems = [
      { itemName: "burgers" },
      { itemName: "fries" },
      { itemName: "cole slaw" },
      { itemName: "potato salad" },
      { itemName: "hot dogs" },
      { itemName: "coke" },
      { itemName: "sprite" },
    ]
    db.Item.bulkCreate(newItems)
      .then( () => db.Item.findAll())
      .then((dbItems) => console.log(JSON.stringify(dbItems, '', 2)))
    // .then(() => db.sequelize.close());
  })

  .catch((err) => console.error(err.message));
