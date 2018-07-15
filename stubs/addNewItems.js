const db = require('../models');

db.sequelize.sync()
  .then(function () {
    const newItem = {
      itemName: "item 1"
    };

    db.Item.create(newItem)
      .then((dbItem) => console.log(JSON.stringify(dbItem, '', 2)))
      .then(() => db.sequelize.close());
  })

  .catch((err) => console.error(err.message));
