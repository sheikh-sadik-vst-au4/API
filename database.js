const mongoose = require('mongoose');
const url = 'mongodb+srv://admin:admin@cluster0-4yqkc.mongodb.net/flashride?retryWrites=true&w=majority';
const database = {};

database.connect = function () {
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }, function () {
        console.log("connection success");
    });

}

module.exports = database;



