const router = require('express').Router();
const { Comment } = require('../../models/');
const { withAuth } = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create( req.body, {
      userId: req.session.user_id,
      signedIn: req.session.signed_in,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
