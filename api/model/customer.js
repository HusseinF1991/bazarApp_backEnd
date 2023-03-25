const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");

const Customer = sequelize.define("Customer" , {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    gender: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      // allowNull defaults to true
    },
    token: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    lat: {
      type: DataTypes.DOUBLE(10,2),
      // allowNull defaults to true
    },
    lng: {
      type: DataTypes.DOUBLE(10,2),
      // allowNull defaults to true
    },
    province: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    region: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    mobile: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    appLanguage: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    isRegistered: {
      type: DataTypes.TINYINT,
      defaultValue: 0
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'customers'
  });

  // `sequelize.define` also returns the model
  console.log(Customer === sequelize.models.Customer); // true

  module.exports = Customer;