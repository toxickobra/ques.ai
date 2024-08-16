const mongoose = require('mongoose');

const ObjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true } // Reference to the Project
});

module.exports = mongoose.model('Object', ObjectSchema);
