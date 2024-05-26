// server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const noteController = require('./Controller/noteController');

require('./dbConnection'); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

// EJS setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express session setup
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Passport setup
passport.use(
  new Auth0Strategy({
    // Add Auth0 configuration here
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => res.render('HomePage'));
app.get('/login', (req, res) => res.render('LoginPage'));

// Example protected route
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('Dashboard', { user: req.user });
});

// API Routes
app.get('/api/notes', noteController.getAllNotes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
