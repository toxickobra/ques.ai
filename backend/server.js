const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session'); // Import express-session
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');

const objectRoutes = require('./routes/object'); // Register object routes

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://ques-ai-chi.vercel.app'], // Allow both localhost and Vercel URLs
    credentials: true // Allow cookies and sessions if needed
}));


// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a secure secret key from environment variables
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // Session cookie expiry (24 hours)
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', objectRoutes); // Register object routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
