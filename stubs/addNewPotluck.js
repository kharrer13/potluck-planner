const db = require('../models');

db.sequelize.sync()
  .then(function () {
    const newPotluck = {
      eventName: "event 1",
      eventLocation: "joe's house",
      privateEvent: false

    };

    db.Potluck.create(newPotluck)
      .then((dbPotluck) => console.log(JSON.stringify(dbPotluck, '', 2)))
      .then(() => db.sequelize.close());
    })

  .catch((err) => console.error(err.message));
