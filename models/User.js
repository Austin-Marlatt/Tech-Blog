// Model that defines the layout for user accounts entries into the database

// // Required models from sequelize
// `Model` represents a table in the db, we can import and create a new instance of for our specific use
// `DataType`s is an object defined in the `sequels` module, It stores the definitions of the types of data that can be used in a sequelize Database
// By envoking `DataTypes` as a `type` inside of a Column, we can define the `type` of data this Column excepts
const { Model, DataTypes } = require("sequelize");
// An encryption tool used for securely storing passwords in the db, validates a password attempt vs a hashed version on the db
const bcrypt = require("bcrypt");

// Connection to the db
const sequelize = require("../config/connection");

// Declare new class that extends the sequelize Model
// In this model I am passing a `checkPassword` method to be used for validating a password attempt
class User extends Model {
  checkPassword(passwordAttempt) {
    // Runs bcrypt's `compareSync` method on the param `passwordAttempt` against `this.password` <= `this` being this user's encrypted password on the db
    return bcrypt.compareSync(passwordAttempt, this.password);
  }
}

// Initialize the new class and define the Columns
User.init(
  {
    // Name of Column
    id: {
      // Type of data will be an number
      type: DataTypes.INTEGER,
      // Cannot be left empty
      allowNull: false,
      // Use this id as the primary key to be referenced by other models in the database
      primaryKey: true,
      // Each new instance of this integer will be of the next higher value
      autoIncrement: true,
    },
    username: {
      // Type of data will be an string
      type: DataTypes.STRING,
      // Must not match an existing username in the db
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // Validates that the following params are true before creating or updating the password column
      validate: {
        // Password length must me between 6 and 24 characters
        len: [6, 24],
        // Password must contain at least one number
        isDecimal: true,
        // Cannot be empty
        notNull: true,
        // Cannot be a version of the username
        notContains: this.username,
      },
    },
  },
  {
    // Create hook functions which are called before and / or after calls in sequelize are executed
    hooks: {
      // Hook that runs after all the required columns are filled out and validtion runs successfully before being saved to the db
      beforeCreate: async (userData) => {
        // Takes new plain text password and passes it through a hash to encrypt it, set salt count to 10
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
      // Does the same as above, but when a user updates their password. Otherwise, their new password would only save as plaintext
      beforeUpdate: async (userData) => {
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
    },
    // Sequlize connection
    sequelize,
    // Keep the defined name
    freezeTableName: true,
    // Converts cameCased Columns to under_scorded
    underscored: true,
    // Name of the model, now the uppercase `User` references the class, while the lowercased `user` references the model
    modelName: "user",
  }
);

module.exports = User;
