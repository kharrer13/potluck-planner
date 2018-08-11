const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const bcrypt = require('bcryptjs');


const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./models");

// Define middleware here
// Configure the local strategy for use by Passport.
passport.use(
  new LocalStrategy(function (username, password, cb) {
    console.log("calling Strategy with username:", username);
    db.User.findOne({
      where: { username: username }
    })
      .then(dbUser => {
        if (!dbUser) {
          return cb(null, false);
        }
        if (!bcrypt.compareSync(password, dbUser.get('password'))) {
          return cb(null, false);
        }

        return cb(null, dbUser);
      })
      .catch(err => cb(err));
  })
);


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  console.log("serializeUser called for", user.get('username'));
  // const { password, ...tempUser } = user.get();
  // console.log(tempUser);
  
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  console.log('deserializeUser called id', id);

  db.User.findById(id, {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
  })
    .then(dbUser => {
      return cb(null, dbUser.get());
    })
    .catch(err => cb(err));
});

if (process.env.NODE_ENV === "production") {
  app.use(require('morgan')('common'));
} else {
  app.use(require('morgan')('dev'));
}


app.use(require('cookie-parser')());
// TODO clip out bodyparser with express built-in body parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} 
// else {
//   app.use(express.static("public"));
// }
// TODO go back in history and see blame for the public line

// TODO move session secret and maxAge to environment variables
app.use(session({
  secret: 'draco dormiens nunquam titillandus',
  cookie: { maxAge: 120000 },
  store: new SequelizeStore({
    db: db.sequelize,
  }),
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



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
