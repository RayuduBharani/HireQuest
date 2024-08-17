const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: String, required: true },
  experience: { type: Number, required: true },
  skills: [String],
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

const candidateModel = mongoose.models.Candidate || mongoose.model("Candidate" , candidateSchema)


module.exports = candidateModel
