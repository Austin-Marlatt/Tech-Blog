// Middleman for DB requests

// Express module that allows routing requests between files
const router = require('express').Router();

// JS route file locations
const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashRoutes');
const apiRoutes = require('./api');

// Endpoint associations to the route files
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);
router.use('/api', apiRoutes);

module.exports = router;
