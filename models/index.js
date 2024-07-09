const BlogPost = require('./BlogPost');
const Comment = require('./Comment');
const User = require('./User');

BlogPost.belongsto(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

BlogPost.hasMany(Comment, {
  foreignKey: 'BlogPostId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = {
  BlogPost,
  Comment,
  User,
};