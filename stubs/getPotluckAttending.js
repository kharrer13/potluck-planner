const db = require('../models');

const fakeId = 1;

db.sequelize.sync().then(function() {
  db.Potluck.findAll({
    // where: {privateEvent: true},
    include: [
      {
        model: db.User,
        as: 'Attendee',
        where: { id: fakeId },
        attributes: []
      }
    ]
  })
    .then(dbPotluck => console.log(JSON.stringify(dbPotluck, '', 2)))
    .then(() => db.sequelize.close())

    .catch(err => {
      console.error(err.message);
      return db.sequelize.close();
    });
});
