'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    eventLocation: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    privateEvent: DataTypes.BOOLEAN
  }, {
    timestamps: false
  });
  Event.associate = function(models) {
    // associations can be defined here
    models.Event.belongsTo(models.User);
    models.Event.hasMany(models.Item);
  };
  return Event;
};