// Acts as a middleman between the base controllers and the API
// passes endpoint requests to the correct files

const router = require('express').Router();

// JS route file locations
const blogPostRoutes = require('./blogPostRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');

// Endpoint associations to the route files
router.use('/blogPosts', blogPostRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;
