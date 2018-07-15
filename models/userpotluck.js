'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserPotluck = sequelize.define('UserPotluck', {}, {
    timestamps: false
  });
  UserPotluck.associate = function (models) {
    // associations can be defined here
  };
  return UserPotluck;
};