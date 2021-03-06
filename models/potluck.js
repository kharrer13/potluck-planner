'use strict';
module.exports = (sequelize, DataTypes) => {
  var Potluck = sequelize.define('Potluck', {
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
      // timestamps: false
    });
  Potluck.associate = function (models) {
    // associations can be defined here
    models.Potluck.belongsTo(models.User, { as: 'Owner' });
    models.Potluck.belongsToMany(models.User, { through: models.PotluckAttendee, as: 'Attendee' });
    models.Potluck.belongsToMany(models.User, { through: models.PotluckInvitee, as: 'Invitee' });
    models.Potluck.belongsToMany(models.Item, { through: models.PotluckItem });
  };
  return Potluck;
};