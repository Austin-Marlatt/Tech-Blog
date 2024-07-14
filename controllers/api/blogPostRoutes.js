// Handles request to the `/api/blogPosts/` endpoint

const router = require('express').Router();
const { BlogPost } = require('../../models');
const { withAuth } = require('../../utils/auth');

// Renders the `newBlogPost` view
// `withAuth` middleware checks if user is signed in, redirects to the `signIn` view if not
router.get('/newBlogPost', withAuth, async (req,res) => {
  // try => catch error handling
  try {
    res.render('newBlogPost', {
      signedIn: req.session.signed_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Endpoint that handles the creation of new BlogPosts into the db
router.post('/newBlogPost', withAuth, async (req, res) => {
  // Receives blog post data in the request body
  const body = req.body;

  // Trys to run the `create` method on the BlogPost model, passing in the request body using a spread operator, and the current users id to tie the post to their account
  try {
    const newBlogPost = await BlogPost.create({ ...body, userId: req.session.user_id });
    res.json(newBlogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates a blog post, specified by ID, looks for any updates rows and applies them
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [updatedRows] = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // If greater than 0, success and end the process
    if (updatedRows > 0) {
      res.status(200).end();
    } else {
      // If no updated rows are found, throw a file not found 404 error
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes a blog post, specified by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [updatedRows] = BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (updatedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
