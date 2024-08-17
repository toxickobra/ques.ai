// routes/authRoutes.js

const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Token verification route
router.get('/verify', authenticateToken, (req, res) => {
  res.sendStatus(200); // If the token is valid, send back a 200 status
});

// Profile route (this is the route that was missing)
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
