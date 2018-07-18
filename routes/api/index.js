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
  db.User.findAll()
    .then(dbUsers => res.json(dbUsers))
})

router.post('/users', function (req, res) {
  newUser = { ...req.body }
  db.User.create(newUser)
    .then(dbUser => res.json(dbUser))
})

router.get('/potluck', function (req, res) {
  // db.Potluck.findAll({ include: [{ all: true }] })
  db.Potluck.findAll({ include: ['Attendee'] })
    .then(dbPotluck => res.json(dbPotluck))
})

router.post('/potluck', function (req, res) {
  newPotluck = { ...req.body }
  db.Potluck.create(newPotluck)
    .then(dbPotluck => res.json(dbPotluck))
})

router.get('/potluck/:potluckId', function (req, res) {
  // db.Potluck.findAll({ where: { id: req.params.potluckId }, include: [{ all: true }] })
  db.Potluck.findAll({ where: { id: req.params.potluckId }, include: ['Attendee'] })
    .then(dbPotluck => res.json(dbPotluck))
})

router.get('/items', function (req, res) {
  // db.Item.findAll({ where: req.query, include: [{ all: true }] })
  // need to validate req.query, e.g. copy just the parameters that make sense and make sure they are ok
  db.Item.findAll()
    .then(dbItem => {
      return res.json(dbItem)
    })
})


module.exports = router;
