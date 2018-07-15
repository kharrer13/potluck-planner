'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
      timestamps: false
    });
  User.associate = function (models) {
    // associations can be defined here
    models.User.belongsToMany(models.Potluck, { through: models.UserPotluck });
    models.User.hasMany(models.Item);
  };
  return User;
};