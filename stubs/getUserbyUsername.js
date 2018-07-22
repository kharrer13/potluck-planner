const db = require('../models');

db.sequelize.sync()
  .then(function () {

    db.User.findOne({
      where: {username: 'harry'},
      include: [{ all: true }]
    })
      .then((dbUser) => console.log(JSON.stringify(dbUser, '', 2)))
      .then(() => db.sequelize.close());
  })

  .catch((err) => console.error(err.message));
