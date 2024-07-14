// Handles `/api/comment/` endpoint requests

// Required modules and middleware
const router = require('express').Router();
const { withAuth } = require('../../utils/auth');
const { Comment } = require('../../models');

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newComment = await Comment.create({ ...body, userId: req.session.user_id, });

    res.status(200).json(newComment).statusMessage('Comment Created');
  } catch (err) { res.status(500).json(err); }
  });

module.exports = router;
