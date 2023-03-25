const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");
const Item = require("./item");

const ItemType = sequelize.define("ItemType" , {
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
    typeName: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    availableQty: {
      type: DataTypes.DOUBLE(10,2),
      allowNull:false,
      default:0
      // allowNull defaults to true
    },
    purchasePrice: {
      type: DataTypes.DOUBLE(10,2),
      allowNull:false
      // allowNull defaults to true
    },
    sellPrice: {
      type: DataTypes.DOUBLE(10,2),
      allowNull:false
      // allowNull defaults to true
    },
    discountPrice: {
      type: DataTypes.DOUBLE(10,2),
      allowNull:false
      // allowNull defaults to true
    },
    description: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    expDate: {
      type: DataTypes.DATEONLY,
      // allowNull defaults to true
    },
    deleteFlag: {
      type: DataTypes.TINYINT,
      defaultValue : 0
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'itemTypes'
  });
  
  Item.hasMany(ItemType , {foreignKey :'itemId' });
  ItemType.belongsTo(Item , {foreignKey :'itemId' });

  // `sequelize.define` also returns the model
  console.log(ItemType === sequelize.models.ItemType); // true

  module.exports = ItemType;