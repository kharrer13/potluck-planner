const db = require('../models');

db.sequelize.sync()
  .then(function () {

    db.Potluck.findById(1)
      .then((dbPotluck) => {
        console.log(JSON.stringify(dbPotluck, '', 2))
        dbPotluck.update({privateEvent: !dbPotluck.privateEvent})
          .then((result) => console.log(JSON.stringify(result, '', 2)))
          .then(() => db.sequelize.close())
          .catch((err) => console.error(err.message));

      })
  })








