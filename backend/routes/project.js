const express = require('express');
const auth = require('../middleware/auth');
const {
  addyourproject,
  getProjectById,
  getAllProjectsForUser,
  deleteProject,
  getProjectObjectCount
} = require('../controllers/projectController');
const router = express.Router();

// Create a new project
router.post('/', auth, addyourproject);

// Get a project by ID
router.get('/:id', auth, getProjectById);

// Get all projects for the authenticated user
router.get('/', auth, getAllProjectsForUser);

// Delete a project by ID
router.delete('/:id', auth, deleteProject);

route.delete(':/id',auth , deleteProject);

module.exports = router;
