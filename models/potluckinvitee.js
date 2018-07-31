'use strict';
module.exports = (sequelize, DataTypes) => {
  var PotluckInvitee = sequelize.define('PotluckInvitee', {}, {
    // timestamps: false
  });
  PotluckInvitee.associate = function (models) {
    // associations can be defined here
  };
  return PotluckInvitee;
};