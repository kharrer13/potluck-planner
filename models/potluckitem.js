'use strict';
module.exports = (sequelize, DataTypes) => {
  var PotluckItem = sequelize.define('PotluckItem', {}, {
    timestamps: false
  });
  PotluckItem.associate = function (models) {
    // associations can be defined here
  };
  return PotluckItem;
};
