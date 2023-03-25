const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/connection");
const Shop = require("./shop");

const Manager = sequelize.define("Manager" , {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique : true
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    token: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    shopId: {
      type: DataTypes.BIGINT,
      // allowNull defaults to true
    },
  }, {
    // Other model options go here
    freezeTableName: true,
    tableName: 'managers'
  });
  
  
  Shop.hasMany(Manager , {foreignKey :'shopId' });
  Manager.belongsTo(Shop , { foreignKey :'shopId'});

  // `sequelize.define` also returns the model
  console.log(Manager === sequelize.models.Manager); // true

  module.exports = Manager;