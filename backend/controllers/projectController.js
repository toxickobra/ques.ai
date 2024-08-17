const Project = require('../models/Project');
const Object = require('../models/Object');
// Create a new project
exports.addyourproject = async (req, res) => {
  try {
    const { name } = req.body;
    const newProject = new Project({ user: req.user.id, name });
    const project = await newProject.save();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getAllProjectsForUser = async (req, res) => {
    try {
      const projects = await Project.find({ user: req.user.id });
  
      const projectsWithObjectCounts = await Promise.all(
        projects.map(async (project) => {
          
          const objectCount = await Object.countDocuments({ project: project._id });
          
          
          return { ...project.toObject(), objectCount };
        })
      );
  
      res.json(projectsWithObjectCounts);
    } catch (error) {
      res.status(500).send('Server error');
    }
  };
// Get all projects for the authenticated user


// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
