// Model that defines the layout for Blog Post entries into the database

// Required models from sequelize
// `Model` represents a table in the db, we can import and create a new instance of for our specific use
// `DataType`s is an object defined in the `sequels` module, It stores the definitions of the types of data that can be used in a sequelize Database
// By envoking `DataTypes` as a `type` inside of a Column, we can define the `type` of data this Column excepts
const { Model, DataTypes } = require("sequelize");

// Connection to the db
const sequelize = require("../config/connection");

// Declare new class that extends the sequelize Model
class BlogPost extends Model {}

// Initialize the new class and define the Columns
BlogPost.init(
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
    title: {
      // Type of data will be an string
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Sequlize connection
    sequelize,
    // Keep the defined name
    freezeTableName: true,
    // Converts cameCased Columns to under_scorded
    underscored: true,
    // Name of the model, now the uppercase `BlogPost` references the class, while the lowercased `blog_post` references the model
    modelName: "blog_post",
  }
);

// Export the Model
module.exports = BlogPost;
