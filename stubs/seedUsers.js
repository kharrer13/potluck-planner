const db = require('../models');

db.sequelize.sync()
  .then(function () {
    const newUsers = [{
      "username": "bob",
      "firstName": "Bob",
      "lastName": "Belcher",
      "email": "bob@bobsburgers.com"
    }, {
      "username": "linda",
      "firstName": "Linda",
      "lastName": "Belcher",
      "email": "linda@bobsburgers.com"
    }, {
      "username": "tina",
      "firstName": "Tina",
      "lastName": "Belcher",
      "email": "tina@bobsburgers.com"
    }, {
      "username": "gene",
      "firstName": "Gene",
      "lastName": "Belcher",
      "email": "gene@bobsburgers.com"
    }, {
      "username": "louise",
      "firstName": "Louise",
      "lastName": "Belcher",
      "email": "louise@bobsburgers.com"
    }

    ];

    db.User.bulkCreate(newUsers)
      .then(() => db.User.findAll())
        .then((users) => {
          console.log(JSON.stringify(users, '', 2))
        })
        // .then(() => db.sequelize.close())
      })

  .catch((err) => console.error(err.message));
