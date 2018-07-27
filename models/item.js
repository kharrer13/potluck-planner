'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
      // timestamps: false
    });
  Item.associate = function (models) {
    // associations can be defined here
    models.Item.belongsTo(models.User);
    models.Item.belongsToMany(models.Potluck, { through: models.PotluckItem });
  };
  return Item;
};
