const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");
const Invoice = require("./invoice");
const Shop = require("./shop");

const InvoiceShop = sequelize.define("InvoiceShop" , {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    invoiceId: {
      type: DataTypes.BIGINT,
      allowNull:false
      // allowNull defaults to true
    },
    shopId: {
      type: DataTypes.BIGINT,
      allowNull:false
      // allowNull defaults to true
    },
    totalCost: {
      type: DataTypes.DOUBLE(10,2),
      allowNull:false
      // allowNull defaults to true
    },
    paidAmount: {
      type: DataTypes.DOUBLE(10,2),
      allowNull:false,
      defaultValue: 0
      // allowNull defaults to true
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull:false,
      // allowNull defaults to true
    },
    status: {  //onWait/pending , aproved , delivered
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    deleteFlag: {  //onWait/pending , aproved , delivered
      type: DataTypes.TINYINT,
      allowNull:false,
      defaultValue:0
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'invoiceShops'
  });
  
  Invoice.hasMany(InvoiceShop , {foreignKey :'invoiceId' });
  InvoiceShop.belongsTo(Invoice , {foreignKey :'invoiceId' });
  
  Shop.hasMany(InvoiceShop , {foreignKey :'shopId' });
  InvoiceShop.belongsTo(Shop , {foreignKey :'shopId' });

  // `sequelize.define` also returns the model
  console.log(InvoiceShop === sequelize.models.InvoiceShop); // true

  module.exports = InvoiceShop;