const { User, BlogPost } = require('../models');
const sequelize = require('../config/connection');

const postData = require('./postSeeds.json');
const userData = require('./userSeeds.json');

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await BlogPost.create({
      ...post,
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDB();
