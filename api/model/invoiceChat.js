const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");
const InvoiceShop = require("./invoiceShop");

const InvoiceChat = sequelize.define("InvoiceChat" , {
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
    msgBody: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    sender: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    isRead: {
      type: DataTypes.TINYINT,
      allowNull:false,
      default: 0
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'invoiceChats'
  });
  
  InvoiceShop.hasMany(InvoiceChat , {foreignKey :'invoiceShopId' });
  InvoiceChat.belongsTo(InvoiceShop , {foreignKey :'invoiceShopId' });

  // `sequelize.define` also returns the model
  console.log(InvoiceChat === sequelize.models.InvoiceChat); // true

  module.exports = InvoiceChat;