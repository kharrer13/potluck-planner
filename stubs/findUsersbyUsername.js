const db = require('../models');

const Op = db.Sequelize.Op;

db.sequelize.sync().then(function() {
  db.User.findAll({
    where: {
      // [Op.or]: [{ username: ['harry'] }, { username: ['ron'] }, { username: ['hermione'] }, { username: ['luna'] }, { username: ['ginny'] }]
      [Op.or]: [{ username: ['harry', 'ron', 'hermione'] }]
    },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
  })
    .then(dbPotluck => {
      console.log(JSON.stringify(dbPotluck, '', 2));
    })
    .then(() => db.sequelize.close())
    .catch(err => console.error(err.message));
});
