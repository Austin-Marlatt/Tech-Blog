// Handles routes at the root `/` level

const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");

// Endpoint called when you firt visit the website
router.get("/", async (req, res) => {
  try {
    // Finds all blog posts and returns them with their associated user
    const postData = await BlogPost.findAll( {include: [User],} );

    // Returns them in an array
    const blogPosts = postData.map((post) => post.get({ plain: true }));

    // Render the `homepage` view with the blogposts passed
    res.render("homepage", { blogPosts, signedIn: req.session.signed_in,});
  } catch (err) {
    res.status(500).json(err);
  }
});

// Endpont to view a single blog post by specified ID
router.get("/blogPost/:id", async (req, res) => {
  try {
    // Find by ID
    const postData = await BlogPost.findByPk(req.params.id, {
      // Return with the associated user and comment(user) models
      include: [ User, { model: Comment, include: [User], }, ],
    });

    if (postData) {
      const blogPost = postData.get({ plain: true });
      // Render the `blogPost` view with the single blog post
      res.render("blogPost", { blogPost, signedIn: req.session.signed_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the `signIn` view
router.get("/signIn", (req, res) => {
  try {
    res.render("signIn");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the `signUp` view
router.get("/signUp", (req, res) => {
  try {
    res.render("signUp");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
