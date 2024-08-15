const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    useremail: {
        type: String,
        required : true
    },
    userimage: {
        type: String,
        default:'https://www.citypng.com/public/uploads/preview/download-profile-user-round-purple-icon-symbol-png-701751695033518isbhujfjbf.png'
    },
    userpassword: {
        type: String,
        required : true
    }
}, {timestamps : true})

const userModel = mongoose.models.users || mongoose.model("users" , userSchema)

module.exports = userModel