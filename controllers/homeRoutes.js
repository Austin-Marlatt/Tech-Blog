const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await BlogPost.findAll({
      include: [User],
    });

    const blogPosts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", { blogPosts, signedIn: req.session.signed_in,});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blogPost/:id", async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: User,
        },
      ],
    });

    if (postData) {
      const blogPost = postData.get({ plain: true });

      res.render("blogPost", { blogPost, signedIn: req.session.signed_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signIn", (req, res) => {
  try {
    res.render("signIn");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signUp", (req, res) => {
  try {
    res.render("signUp");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
