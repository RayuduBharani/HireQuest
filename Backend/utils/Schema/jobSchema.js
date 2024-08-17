const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  experienceRequired: { type: Number, required: true },
  skillsRequired: [String],
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  candidatesApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
}, { timestamps: true });

const jobModel = mongoose.models.Job || mongoose.model("Job" , jobSchema)


module.exports = jobModel
