const router = require("express").Router();
const db = require('../../models');

console.log('routes/api called');


router.get('/ok', function (req, res) {
  res.send('ok')
})

router.all('/echo', function (req, res) {
  res.json(req.body)
})

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
  db.Potluck.findAll({ include: [{ all: true }] })
    .then(dbPotluck => res.json(dbPotluck))
})

router.post('/potluck', function (req, res) {
  newPotluck = { ...req.body }
  db.Potluck.create(newPotluck)
    .then(dbPotluck => res.json(dbPotluck))
})

router.get('/potluck/:potluckId', function (req, res) {
  db.Potluck.findAll({ where: { id: req.params.potluckId }, include: [{ all: true }] })
    .then(dbPotluck => res.json(dbPotluck))
})



module.exports = router;
