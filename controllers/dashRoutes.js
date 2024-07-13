const router = require('express').Router();
const { BlogPost } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findAll({
      where: {
        userId: req.session.user_id,
      },
    });

    const blogPosts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      blogPosts,
      signedIn: req.session.signed_in,
    });
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/newBlogPost', withAuth, (req, res) => {
  res.render('newBlogPost', {
    signedIn: req.session.signed_in,
  });
});

router.get('/updateBlogPost/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id);

    if (postData) {
      const blogPost = postData.get({ plain: true });

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
