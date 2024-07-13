const router = require('express').Router();

const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

router.use('/blogPosts', blogPostRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);


module.exports = router;
