const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require("passport")
// const Strategy = require('passport-local').Strategy;


// API Routes
router.use("/api", apiRoutes);

router.post('/login',
  passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/login.html'
    }),
  function (req, res) {
    console.log('/login called, authenticate run');
    console.log(req.body);

    res.json(req.body)
  }
);

// router.get('/login', function (req, res) {
//   res.send('login'+ req.user)
// })

// router.get('/', function (req, res) {
//   res.send('root' + req.user)
// })



// If no API routes are hit, send the React app
// router.use(function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
