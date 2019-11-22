const express = require('express');
const router = express();
const hbs = require('./handlebars.js');
const moment = require('moment');
// const driver = require('./models/Driver.js');
const ride = require('./models/Rides');
const database = require('./database.js');

database.connect();

router.engine(".hbs", hbs.engine);
router.set("view engine", ".hbs");

router.get('/', function (req, res) {

    ride.find().exec().then(function (result) {

        var rideDetails = [];
        for (var i = 0; i < result.length; i++) {
            rideDetails.push({
                from: result[i].from,
                to: result[i].to,
                cancel: result[i].cancel,
                fare: result[i].fare,
                time: moment(result[i].time).format('llll')
            });
        }
            res.render("home", { data: rideDetails });
            console.log(rideDetails);

    }).catch(function (err) {
        if (err) {
            console.log(err);
            res.json(err);
        }
    });

});

module.exports = router;