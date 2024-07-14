// Handles `/api/comment/` endpoint requests

// Required modules and middleware
const router = require('express').Router();
const { Comment } = require('../../models/');
const { withAuth } = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newComment = await Comment.create({ ...body, userId: req.session.user_id, });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
