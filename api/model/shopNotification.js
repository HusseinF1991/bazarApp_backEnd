const { DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");
const Shop = require('./shop');


const ShopNotification = sequelize.define("ShopNotification" , {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    shopId: {
      type: DataTypes.BIGINT,
      allowNull:false
      // allowNull defaults to true
    },
    opTitle: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    opDescription: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    opTable: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    opColName: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    opColContent: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'shopNotifications',
    paranoid: true,
  });
  
  Shop.hasMany(ShopNotification , {foreignKey :'shopId' });
  ShopNotification.belongsTo(Shop , {foreignKey :'shopId' });

  // `sequelize.define` also returns the model
  console.log(ShopNotification === sequelize.models.ShopNotification); // true

  module.exports = ShopNotification;