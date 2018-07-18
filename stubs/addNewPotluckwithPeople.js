const db = require('../models');

db.sequelize.sync()
  .then(function () {
    const newPotluck = {
      eventName: "event 2",
      eventLocation: "thomas's house",
      privateEvent: false

    };

    db.Potluck.create(newPotluck)
      .then((dbPotluck) => {
        dbPotluck.setOwner(1)
        dbPotluck.setAttendee([1, 2, 3, 4, 5, 6])
        console.log(JSON.stringify(dbPotluck, '', 2))
      })
      // .then(() => db.sequelize.close());
  })

  .catch((err) => console.error(err.message));
