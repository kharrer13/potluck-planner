const db = require('../models');

db.sequelize.sync()
  .then(function () {
    const newUser = {
      "username": "bob",
      "firstName": "Bob",
      "lastName": "Belcher",
      "email": "bob@bobsburgers.com"
    };

    db.User.create(newUser)
      .then((dbUser) => console.log(JSON.stringify(dbUser, '', 2)))
      .then(() => db.sequelize.close());
  })

  .catch((err) => console.error(err.message));
