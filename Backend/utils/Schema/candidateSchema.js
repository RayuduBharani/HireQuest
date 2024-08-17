const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: String, default : null },
  experience: { type: Number, required: true }, // in years
  skills: [String],
  education: [{
    degree: { type: String, default : null},
    institution: { type: String, default : null },
    yearOfCompletion: { type: Number, default : null }
  }],
  certifications: [{
    name: { type: String, default : null },
    issuingOrganization: { type: String, default : null },
    issueDate: { type: Date, default : null },
    expirationDate: { type: Date, default : new Date() }
  }],
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  projects: [{
    title: { type: String, default : null },
    description: { type: String, default : null },
    link: { type: String, default : null },
    technologiesUsed: [String]
  }],
  contactInfo: {
    phone: { type: String },
    linkedin: { type: String },
    github: { type: String }
  }
}, { timestamps: true });

const candidateModel = mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);

module.exports = candidateModel;
