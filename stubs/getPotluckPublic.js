const db = require('../models');

const fakeId = 3;

db.sequelize.sync().then(function() {
  db.Potluck.findAll({
    where: { privateEvent: false },
    // include: [
    //   {
    //     model: db.User,
    //     as: 'Invitee',
    //     through: {
    //       where: { UserId: fakeId }
    //     }
    //   }
    // ]
  })
    .then(dbPotluck => console.log(JSON.stringify(dbPotluck, '', 2)))
    .then(() => db.sequelize.close())

    .catch(err => {
      console.error(err.message);
      return db.sequelize.close();
    });
});
