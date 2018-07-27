const router = require("express").Router();
const db = require('../../models');

const Op = db.Sequelize.Op;

// all routes are prefixed by /api

// start dummy routes for testing
router.get('/ok', function (req, res) {
  res.send('ok')
})

router.get('/search', function (req, res) {
  res.json(req.query)
})

router.all('/echo', function (req, res) {
  console.log(req.body)
  res.json(req.body)
})
// end dummy routes for testing

router.get('/users', function (req, res) {
  let query = {};
  if (req.query.user_id) {
    query.id = req.query.user_id;
  }

  db.User.findAll({
    where: query,
    include: [db.Potluck]
    // include: [{ all: true }]
  })
    .then(dbUsers => res.json(dbUsers))
})

router.post('/users', function (req, res) {
  let newUser = { ...req.body }
  db.User.create(newUser)
    .then(dbUser => {
      let { password, ...tempUser } = dbUser.get()
      tempUser.redirectTo = '/login'
      res.json(tempUser)
    })
})

router.get('/potluck', function (req, res) {
  let query = {};
  let include;

  if (req.query.potluck_id) {
    query.id = req.query.potluck_id;
    // include = [{ all: true }];
    include = [
      {
        association: 'Attendee',
        attributes: ['id', 'fullName', 'username']
      },
      'Items'];
  } else {
    include = ['Attendee', 'Items']
  }
  // db.Potluck.findAll({ include: [{ all: true }] })
  db.Potluck.findAll({
    where: query,
    include
  })
    .then(dbPotluck => res.json(dbPotluck))
})
router.get('/mypotlucks', function (req, res) {
  let query = {};
  let include;

  if (req.user) {
    query.id = req.user.id;
  } else {
    include = ['Attendee', 'Items']
  }
  // db.Potluck.findAll({ include: [{ all: true }] })
  db.Potluck.findAll({
    where: query,
    include
  })
    .then(dbPotluck => res.json(dbPotluck))
})

router.post('/potluck', function (req, res) {
  let newPotluck = { ...req.body }

  // later get this from req.user
  let newOwner

  (req.user) ? newOwner = req.user.id : newOwner = false;

  db.Potluck.create(newPotluck)
    .then(dbPotluck => {
      newOwner && (dbPotluck.setOwner(newOwner))
      res.json(dbPotluck)
    })
})

// DRY this up and/or roll it into the query one above
router.get('/potluck/:potluckId', function (req, res) {
  // db.Potluck.findAll({ where: { id: req.params.potluckId }, include: [{ all: true }] })
  db.Potluck.findAll({
    where: { id: req.params.potluckId },
    include: ['Attendee', 'Items']
  })
    .then(dbPotluck => res.json(dbPotluck))
})

router.put('/potluck/:potluckId', function (req, res) {
  // db.Potluck.findAll({ where: { id: req.params.potluckId }, include: [{ all: true }] })
  // this actually returns the array of rows updated
  db.Potluck.update(req.body, { where: { id: req.params.potluckId } })
    .then(dbPotluck => res.json(dbPotluck))
})

router.get('/items', function (req, res) {
  let query = {};
  if (req.query.item_id) {
    query.id = req.query.item_id;
  }
  // db.Item.findAll({ where: req.query, include: [{ all: true }] })
  // need to validate req.query, e.g. copy just the parameters that make sense and make sure they are ok
  db.Item.findAll({
    where: query
  })
    .then(dbItem => {
      return res.json(dbItem)
    })
})

router.post('/items', function (req, res) {
  let newItem = { ...req.body }

  // later get this from req.user
  let newOwner = req.user.id;
  newItem.UserId = newOwner;
  db.Item.create(newItem)
    .then(dbItem => {
      res.json(dbItem)
    })
})

router.post('/potluck-item', function (req, res) {
  // const { potluckId, itemId } = req.body

  db.Potluck.findById(req.body.PotluckId)
    .then((dbPotluck) => {
      db.Item.findById(req.body.ItemId)
        .then(dbItem => {
          console.log(JSON.stringify(dbPotluck, '', 2))
          dbPotluck.addItem(dbItem)
            .then(result => res.json(result))

          console.log(JSON.stringify(dbPotluck, '', 2))
        })
    })
    .catch(e => res.json(e))

  // db.PotluckItem.create(req.body)
  //   .then(result => res.json(result))
  //   .catch(e => res.json(err))

})

router.post('/attend', function (req, res) {

  db.Potluck.findById(req.body.PotluckId)
    .then((dbPotluck) => {
      console.log(JSON.stringify(dbPotluck, '', 2))
      if (!req.body.attending) {
        dbPotluck.removeAttendee(req.user.id)
        .then(result => res.json(result))
      } else {
        dbPotluck.addAttendee(req.user.id)
        .then(result => res.json(result))
      }

    })
    .catch(e => res.json(e))

})

router.get('/whoami', function (req, res) {
  if (req.user) {
    res.json(req.user)
  } else {
    res.json({ id: null, username: null })
  }
})

module.exports = router;
