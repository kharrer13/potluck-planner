const router = require("express").Router();
const db = require('../../models');

// all routes are prefixed by /api

// start dummy routes for testing
router.get('/ok', function (req, res) {
  res.send('ok')
})

router.get('/search', function (req, res) {
  res.json(req.query)
})

router.all('/echo', function (req, res) {
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
    .then(dbUser => res.json(dbUser))
})

router.get('/potluck', function (req, res) {
  let query = {};
  if (req.query.potluck_id) {
    query.id = req.query.potluck_id;
  }

  // db.Potluck.findAll({ include: [{ all: true }] })
  db.Potluck.findAll({
    where: query,
    include: ['Attendee', 'Items']
  })
    .then(dbPotluck => res.json(dbPotluck))
})

router.post('/potluck', function (req, res) {
  let newPotluck = { ...req.body }

  // later get this from req.user
  let newOwner = 8;
  db.Potluck.create(newPotluck)
    .then(dbPotluck => {
      dbPotluck.setOwner(newOwner)
      res.json(dbPotluck)
    })
})

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
  let newOwner = 11;
  newItem.UserId = newOwner;
  db.Item.create(newItem)
    .then(dbItem => {
      res.json(dbItem)
    })
})

router.get('/whoami',  function (req, res) {
  if (req.user) {
    res.json(req.user)
  } else {
    res.send('nobody')
  }
})

module.exports = router;
