const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await BlogPost.findAll({
      include: User,
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homePage", { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blogPost/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: User,
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("blogPost", { post, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signIn", (req, res) => {
  try {
    res.render("signin");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  try {
    res.render("signUp");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
