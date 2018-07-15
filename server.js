const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./models");


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

db.sequelize.sync({ force: true })
  .then(function () {

    // Start the API server
    app.listen(PORT, function () {
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
  })
  .catch((err) => console.error(err.message))