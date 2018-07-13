'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    itemName: DataTypes.STRING
  }, {
    timestamps: false
  });
  Item.associate = function (models) {
    // associations can be defined here
    models.Item.belongsTo(models.User);
    models.Item.belongsTo(models.Event);
  };
  return Item;
};
