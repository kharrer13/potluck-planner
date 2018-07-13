const router = require("express").Router();

console.log('routes/api called');


router.get('/ok', function (req, res) {
  res.send('ok')
})

router.get('/users', function (req, res) {
  res.json()
})

router.all('/echo', function (req, res) {
  res.json(req.body)
})


module.exports = router;
