'use strict';
module.exports = (sequelize, DataTypes) => {
  var PotluckAttendee = sequelize.define('PotluckAttendee', {}, {
    timestamps: false
  });
  PotluckAttendee.associate = function (models) {
    // associations can be defined here
  };
  return PotluckAttendee;
};