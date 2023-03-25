const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");
const ItemType = require("./itemType");
const InvoiceShop = require('./invoiceShop');


const InvoiceItem = sequelize.define("InvoiceItem" , {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    invoiceShopId: {
      type: DataTypes.BIGINT,
      allowNull:false
      // allowNull defaults to true
    },
    typeId: {
      type: DataTypes.BIGINT,
      allowNull:false
      // allowNull defaults to true
    },
    purchasePrice: {
      type: DataTypes.DOUBLE(10,2)
      // allowNull defaults to true
    },
    sellPrice: {
      type: DataTypes.DOUBLE(10,2),
      allowNull:false
      // allowNull defaults to true
    },
    qty: {
      type: DataTypes.DOUBLE(10,2),
      allowNull:false
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'invoiceItems'
  });
  
  InvoiceShop.hasMany(InvoiceItem , {foreignKey :'invoiceShopId' });
  InvoiceItem.belongsTo(InvoiceShop , {foreignKey :'invoiceShopId' });

  
  ItemType.hasMany(InvoiceItem , {foreignKey :'typeId' });
  InvoiceItem.belongsTo(ItemType, {foreignKey :'typeId' });

  // `sequelize.define` also returns the model
  console.log(InvoiceItem === sequelize.models.InvoiceItem); // true

  module.exports = InvoiceItem;