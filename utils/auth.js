// Custom middleware, handles authentification

// If the user is not signed in, redirect the current request to the signIn route instead
const withAuth = (req, res, next) => {
  if (!req.session.signed_in) {
    res.redirect('/signIn');
  } else {
    next();
  }
};

// Export to use in controllers
module.exports = { withAuth };
