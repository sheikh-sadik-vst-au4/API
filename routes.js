const express = require('express');
const router = express();
const hbs = require('./handlebars.js');
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
        
    res.render("home",{data : result});
    console.log(result);

}).catch(function (err) {
    if (err) {
        console.log(err);
        res.json(err);
    }
});

});
module.exports = router;