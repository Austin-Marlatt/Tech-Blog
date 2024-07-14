// Handles `/api/users` endpoint requests

const router = require('express').Router();
const { User } = require('../../models');

// Endpoint used to create a new User
router.post('/', async (req, res) => {
  try {
    // Create method used on the Users model with the request body as the parameter
    const userData = await User.create(req.body);

    // If the request body was formatted correctly, save the users info into the current session for future reference
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.signed_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//  Endpoint for sign In requests
router.post('/signIn', async (req, res) => {
  try {
    // Trys to find a user in db with the passed in username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    // If no user is found with that username, throw an error and exit the function
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, Please try again' });
      return;
    }

    // Uses Bcrypt's checkPassword method to check the plain text password provided against the hashed version in the database that belongs to this username
    const validPassword = await userData.checkPassword(req.body.password);

    // If the passwords don't match, throw error and exit the function
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, Please try again' });
      return;
    }

    // After a successful sign in, save the users info into the current session for future reference
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.signed_in = true;

      res.status(200).json({
        userData,
        message: 'You are signed in.',
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Endpoint for sign out requests, destroys the current session
router.post('/signOut', (req, res) => {
  if (req.session.signed_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
