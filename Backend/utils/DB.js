const mongoose = require('mongoose');

function DataBase() {
    mongoose.connect('mongodb://localhost:27017/hirequest')
    .then(() => {
        console.log("database connected");
    })
    .catch(() => {
        console.log("Some err happend in the DataBase Connection");
    })
}
module.exports = DataBase