const db = require('../models');

db.sequelize.sync()
  .then(function () {

    db.Potluck.findById(1)
      .then((dbPotluck) => {
        console.log(JSON.stringify(dbPotluck, '', 2))
        db.Sequelize.Promise.all([
          dbPotluck.addAttendee([1, 2, 8, 9, 10, 11, 12, 13, 14]),
          dbPotluck.setOwner(1)
        ])
          .then((result) => console.log(JSON.stringify(result, '', 2)))
          .then(() => db.sequelize.close())
          .catch((err) => console.error(err.message));

      })
  })

