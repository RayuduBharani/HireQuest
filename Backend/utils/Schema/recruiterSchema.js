const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true },
  jobListings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

const recruiterModel = mongoose.models.Recruiter || mongoose.model("Recruiter" , recruiterSchema)


module.exports = recruiterModel
