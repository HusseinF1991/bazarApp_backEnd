const { Sequelize } = require("sequelize");
const config = require("./database.json");

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
});

sequelize.sync({force: false, alter:false}).then(() => {

  try {
    sequelize.authenticate().then(() => {
      console.log("Connection has been established successfully.");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});


module.exports = sequelize;
