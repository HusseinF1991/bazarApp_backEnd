const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/connection");
const Customer = require("./customer");
const sequelizePaginate = require("sequelize-paginate");

const Invoice = sequelize.define(
  "Invoice",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      // allowNull defaults to true
    },
    deleteFlag: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
    tableName: "invoices",
  }
);

sequelizePaginate.paginate(Invoice);

Customer.hasMany(Invoice, { foreignKey: "customerId" });
Invoice.belongsTo(Customer, { foreignKey: "customerId" });

// `sequelize.define` also returns the model
console.log(Invoice === sequelize.models.Invoice); // true

module.exports = Invoice;
