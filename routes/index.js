const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require("passport")
// const Strategy = require('passport-local').Strategy;


// API Routes
router.use("/api", apiRoutes);

router.post("/login", passport.authenticate("local", { /* failureRedirect: "/login" */ }),
  function (req, res) {
    console.log('/login called, authenticate run');
    const { password, createdAt, updatedAt, ...tempUser } = req.user.get();

    res.json({ ...tempUser, loggedIn: true, redirectTo: '/profile' })
  }
);

router.get("/logout", function (req, res) {
  req.logout();
  res.json({ id: null, username: null, loggedIn: false, redirectTo: '/login' })
});

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
