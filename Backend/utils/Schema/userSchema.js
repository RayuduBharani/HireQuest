const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    useremail: { type: String, required: true, unique: true },
    userpassword: { type: String, required: true },
    userimage: { type: String, default: null },
    role: { type: String, enum: ["candidate", "recruiter"], default: null },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "roleProfile",
      default: null,
    },
    roleProfile: {
      type: String,
      enum: ["Candidate", "Recruiter"],
      default: null,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = userModel
