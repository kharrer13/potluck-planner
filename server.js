const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./models");

// Define middleware here
passport.use(new Strategy({
  // allows us to pass back the entire request to the callback
  // passReqToCallback: true
},
  function (username, password, cb) {
    console.log('finding user with username', username);

    db.User.findOne({
      where: { username: username }
    })
      .then((dbUser) => {
        console.log(dbUser.get());

        // if (dbUser.password != password) {
        //   return cb(null, false);
        // }

        return cb(null, dbUser.get());

      })
      .catch(err => cb(err))

    // findByUsername(username, function(err, user) {
    //   if (err) { return cb(err); }
    //   if (!user) { return cb(null, false); }
    //   if (user.password != password) { return cb(null, false); }
    //   return cb(null, user);
    // });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  console.log('serializeUser', user);

  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  console.log('deserializeUser', id);
  db.User.findOne(id)
    .then(dbuser => {
      cb(null, dbUser);
    })
    .catch(err => cb(err))
});


app.use(require('morgan')('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('express-session')({
  secret: 'draco dormiens nunquam titillandus',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static("public"));
}

// Add routes, both API and view
app.use(routes);

db.sequelize.sync({ force: false })
  .then(function () {

    // Start the API server
    app.listen(PORT, function () {
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
  })
  .catch((err) => console.error(err.message))
