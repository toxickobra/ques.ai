const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  createdTime: { type: Date, default: Date.now },
  lastEditedTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
