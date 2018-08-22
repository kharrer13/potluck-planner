const db = require('../models');

const fakeId = 6;

db.sequelize.sync().then(function() {

  db.Sequelize.Promise.all([

    
    db.Potluck.findAll({
      // where: {privateEvent: true},
      include: [
        {
          association: 'Attendee',
          where: { id: fakeId },
          attributes: []
        }
      ]
    }),
    db.Potluck.findAll({
      // where: {privateEvent: true},
      include: [
        {
          association: 'Invitee',
          where: { id: fakeId },
          attributes: []
        }
      ]
    }),
  ])
    .then(result => console.log(JSON.stringify(result, '', 2)))
    .then(() => db.sequelize.close())

    .catch(err => {
      console.error(err.message);
      return db.sequelize.close();
    });
});
