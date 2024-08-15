const mongoose = require('mongoose');

const onboardSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    userType : {
        type : String
    },
    email: {
        type: String
    },
    role: {
        recruiterInfo: {
            name: String,
            companyName: String,
            companyRole: String,
        },
        candidateInfo: {
            name: String,
            currentJobLocation: String,
            currentCompany: String,
            preffedJobLocation: String,
            currentSalary: String,
            noticePeriod: String,
            previesCompanies: String,
            totalExperience: String,
            college: String,
            collegeLocation: String,
            graduateYear: String,
            CGPA: String,
            linkedInProfile: String,
            gitHubProfile: String,
            resume: String
        }
    }
});

const onboardModel = mongoose.models.onboard || mongoose.model("onboard", onboardSchema);

module.exports = onboardModel;
