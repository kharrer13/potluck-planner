'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventLocation: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    privateEvent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
      timestamps: false
    });
  Event.associate = function (models) {
    // associations can be defined here
    models.Event.belongsTo(models.User);
    models.Event.hasMany(models.Item);
  };
  return Event;
};