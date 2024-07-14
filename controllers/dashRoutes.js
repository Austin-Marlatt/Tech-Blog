// Handles endpoints at the `/dashRoutes/` endpoint

const router = require('express').Router();
const { BlogPost } = require('../models');
const { withAuth } = require('../utils/auth');

// Find all Blog Posts belonging to the current user
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findAll({
      where: {
        userId: req.session.user_id,
      },
    });
    // Returns the found blog posts in an array
    const blogPosts = postData.map((post) => post.get({ plain: true }));
  
    // Render the `dashboard` view with the blogposts and signIn state passed in
    res.render('dashboard', {
      blogPosts,
      signedIn: req.session.signed_in,
    });
  } catch (err) {
    res.status(500).json(err);
  };
});

// Render the `newBlogPost` view
router.get('/newBlogPost', withAuth, (req, res) => {
  res.render('newblogpost', {
    signedIn: req.session.signed_in,
  });
});

// Update a blog post using a specified ID
router.get('/updateBlogPost/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id);

    if (postData) {
      const blogPost = postData.get({ plain: true });
      // Render the `updateBlogPost` view if the matching post was found
      res.render('updateBlogPost', {
        blogPost,
        signedIn: req.session.signed_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
