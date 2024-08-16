const ObjectModel = require('../models/Object');
const Project = require('../models/Project');

// Add a new object to a project
exports.createObject = async (req, res) => {
  try {
    const { name, link, uploadDate } = req.body;
    const { projectId } = req.params;

    // Ensure the project exists
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    const newObject = new ObjectModel({ name, link, uploadDate, project: projectId });
    const savedObject = await newObject.save();

    res.json(savedObject);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all objects for a project
exports.getObjectsForProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Ensure the project exists
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // Fetch objects associated with the project
    const objects = await ObjectModel.find({ project: projectId });
    res.json(objects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete an object by ID
exports.deleteObject = async (req, res) => {
  try {
    const { objectId } = req.params;

    // Ensure the object exists
    const object = await ObjectModel.findById(objectId);
    if (!object) return res.status(404).json({ msg: 'Object not found' });

    await ObjectModel.findByIdAndDelete(objectId);
    res.json({ msg: 'Object removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
