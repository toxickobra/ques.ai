const express = require('express');
const auth = require('../middleware/auth');
const { createObject, getObjectsForProject, deleteObject, updateObjectLink } = require('../controllers/objectController');
const router = express.Router();

// Add a new object to a project
router.post('/:projectId/objects', auth, createObject);

// Get all objects for a project
router.get('/:projectId/objects', auth, getObjectsForProject);

// Delete an object by ID
router.delete('/objects/:objectId', auth, deleteObject);

// Update the link for an object by ID
router.put('/objects/:objectId', auth, updateObjectLink);

module.exports = router;
