const db = require('../models');

db.sequelize.sync()
  .then(function () {

    db.Potluck.findAll({
      where: { id: 3 },
      include: [{ all: true }]
    })
      .then((dbPotluck) => console.log(JSON.stringify(dbPotluck, '', 2)))
      .then(() => db.sequelize.close());
  })

  .catch((err) => console.error(err.message));
