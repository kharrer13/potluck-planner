'use strict';

const bcrypt = require('bcryptjs');
const bcryptSaltRounds = 10;

const hashPassword = (User, options) => {
  return bcrypt.hash(User.password, bcryptSaltRounds)
    .then(hashedPassword => User.password = hashedPassword)
}

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true }
    }
  }, {
      // timestamps: false,
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
      }
    });
  User.associate = function (models) {
    // associations can be defined here
    models.User.belongsToMany(models.Potluck, { through: models.PotluckAttendee });
    models.User.belongsToMany(models.Potluck, { through: models.PotluckInvitee });
    models.User.hasMany(models.Item);
  };
  return User;
};