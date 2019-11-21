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
    
//     driver.find().exec().then(function (result) {
        
//         res.render("home",{data : result});

//     }).catch(function (err) {
//         if (err) {
//             console.log(err);
//             res.json(err);
//         }
//     });

// });
ride.find().exec().then(function (result) {
    
    var date = [];
    for(var i = 0;i<result.length;i++)
    {    
     date.push(moment(result[i].time).format('llll'));     
    }
    console.log(date);
    res.render("home",{data : result});

}).catch(function (err) {
    if (err) {
        console.log(err);
        res.json(err);
    }
});

});
module.exports = router;