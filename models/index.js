// Defines the association between the models in the db, and the behavior of those relations

// Models
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');
const User = require('./User');

// A post can belong to a user when a User is deleted,
// When a User is deleted, the Users Posts are deleted as well

// A Blog Post can have many comments attached to it
BlogPost.hasMany(Comment, {
  foreignKey: 'BlogPostId',
  onDelete: 'CASCADE',
});

BlogPost.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

// A Comment can belong to a single user
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = {
  BlogPost,
  Comment,
  User,
};