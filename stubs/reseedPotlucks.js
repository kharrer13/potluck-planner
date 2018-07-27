const db = require('../models');

db.sequelize.sync()
  .then(function () {
    const newPotlucks = [
      {
        "eventName": "Train to school",
        "eventLocation": "Hogwarts Express",
        "eventDate": '2018-09-01T11:00:00',
        "privateEvent": true
      },
      {
        "eventName": "Quidditch World Cup",
        "eventLocation": "Dartmoor",
        "eventDate": '2018-08-18T09:00:00',
        "privateEvent": false
      },
      {
        "eventName": "Fleur and Bill's wedding",
        "eventLocation": "The Burrow",
        "eventDate": '2018-08-01T15:00:00',
        "privateEvent": true
      },
      {
        "eventName": "Quidditch season opener",
        "eventLocation": "Great Hall",
        "eventDate": '2018-11-10T14:00:00',
        "privateEvent": false
      },
      {
        "eventName": "Welcoming Feast",
        "eventLocation": "Great Hall",
        "eventDate": '2018-09-01T20:00:00',
        "privateEvent": false
      }
     ]
    

    db.Potluck.bulkCreate(newPotlucks)
      // .then(() => db.Item.findAll())
      .then((dbPotlucks) => console.log(JSON.stringify(dbPotlucks, '', 2)))
    .then(() => db.sequelize.close())
    .catch((err) => console.error(err.message));
  })

