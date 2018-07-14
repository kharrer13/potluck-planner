const router = require("express").Router();
const db = require('../../models');

console.log('routes/api called');


router.get('/ok', function (req, res) {
  res.send('ok')
})

router.get('/users', function (req, res) {
  db.User.findAll()
    .then(dbUser => res.json(dbUser))
})

router.post('/users', function (req, res) {
  newUser = {...req.body}
  db.User.create(newUser)
    .then(dbUser => res.json(dbUser))
})

router.get('/events', function (req, res) {
  db.Event.findAll()
    .then(dbEvent => res.json(dbEvent))
})

router.post('/events', function (req, res) {
  newEvent = {...req.body}
  db.Event.create(newEvent)
    .then(dbEvent => res.json(dbEvent))
})

router.get('/events/:eventId', function (req, res) {
  db.Event.findAll({where: {id: req.params.eventId}})
  .then(dbEvent => res.json(dbEvent))
})

router.all('/echo', function (req, res) {
  res.json(req.body)
})


module.exports = router;
