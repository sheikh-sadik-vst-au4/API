const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const driver = require('./models/DriverProfileSchema.js');
const url = 'mongodb+srv://admin:admin@cluster0-4yqkc.mongodb.net/flashride?retryWrites=true&w=majority';

// support parsing of application/json type post data
app.use(express.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function () {
    console.log("connection success");
});

app.get('/', function (req, res) {

    driver.find().exec().then(function (result) {
           console.log(result);
           res.json(result);
        
    }).catch(function (err) {
        if (err) {
            console.log(err);
            res.json(err);
        }
    });
});


app.listen(PORT, function (req, res) {
    console.log("Application is running on PORT: ", PORT);
});
