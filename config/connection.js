// Creates a connection to the mysql database

const Sequelize = require("sequelize");
// Allows us to store local access DB credentials
require("dotenv").config();

let sequelize;

// Conditional statement that will allow JAWSDB to syncronize with our app
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
// If running locally, use the .env file to access mysql
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
