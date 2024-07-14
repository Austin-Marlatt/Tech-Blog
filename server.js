const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;
const app = express();

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({});

// Session configuration
const sess = {
  secret: 'Client Secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
// Tell express that we will be rendering the HTML within the handleabrs view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to dynamically change the navbar functionality based on current path location
app.use(function (req, res, next) {
  switch (req.path) {
      case '/dashboard':
          res.locals.dashboard = true;
          break;
      default:
          res.locals.dashboard = false;
  }
  next();
});

app.use(routes);

// Sequilize syncs wiith the db, then the app initializes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});
