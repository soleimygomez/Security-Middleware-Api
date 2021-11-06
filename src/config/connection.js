const { Sequelize } = require('sequelize');

const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: 'mysql',

    pool: {
      max:5,
      min: 1,
      require: null,
      idle: undefined
    },

    logging: function (str) {
      // do your own logging
      console.log("####################################################################11");
      console.log(str);
      console.log("####################################################################22");

    }
  }
);
var db = {};
try {
  sequelize.authenticate();
  console.log('la conexion  se ha establecido correctamente');
}
catch (error) {
  console.error('No se es posible establecer conexion con la base de datos', error);
}

db.user = require('../models/user')(sequelize, Sequelize);
db.auth = require('../models/auth')(sequelize,Sequelize)



module.exports = db;
