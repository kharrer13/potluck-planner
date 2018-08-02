'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVegan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isMilkFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isEggFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPeanutFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isTreenutFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isFishFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isShellfishFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSoyFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isWheatFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isGlutenFree: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
