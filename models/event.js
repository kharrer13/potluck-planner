'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    eventLocation: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    privateEvent: DataTypes.BOOLEAN
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};