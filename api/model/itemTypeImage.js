const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");
const Item = require("./item");
const ItemType = require("./itemType");

const ItemTypeImage = sequelize.define("ItemTypeImage" , {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    itemId: {
      type: DataTypes.BIGINT,
      allowNull:false
      // allowNull defaults to true
    },
    typeId: {
      type: DataTypes.BIGINT,
      allowNull:false
      // allowNull defaults to true
    },
    imageLoc: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'itemTypeImages'
  });
  
  Item.hasMany(ItemTypeImage , {foreignKey :'itemId' });
  ItemTypeImage.belongsTo(Item , {foreignKey :'itemId' });

  
  ItemType.hasMany(ItemTypeImage , {foreignKey :'typeId' });
  ItemTypeImage.belongsTo(ItemType , {foreignKey :'typeId' });

  // `sequelize.define` also returns the model
  console.log(ItemTypeImage === sequelize.models.ItemTypeImage); // true

  module.exports = ItemTypeImage;