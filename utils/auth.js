// Custom middleware, handles authentification

// If the user is not logged in, redirect the request to the login route
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Export to use in controllers
module.exports = withAuth;
