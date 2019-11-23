const express = require('express');
const router = express();
const hbs = require('./handlebars.js');
const moment = require('moment');
// const driver = require('./models/Driver.js');
// const ride = require('./models/Rides');
const database = require('./database.js');
const user = require('./models/User.js');
const ride = require('./models/Ride.js');
bodyParser = require('body-parser');
// support parsing of application/json type post data
router.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));


database.connect();

router.engine(".hbs", hbs.engine);
router.set("view engine", ".hbs");

router.post('/saveuser', function (req, res) {
   
    console.log(req.body);
    var users = new user(req.body);
    users.save(function(error,result){
        if(error)
        {
            console.log(error);
        }
        console.log(result);
    });

    res.json({
        success : "success"
    })
});


router.post('/ride', function (req, res) {
   
    console.log(req.body);
    var rides = new ride(req.body);
    rides.save(function(error,result){
        if(error)
        {
            console.log(error);
        }
        console.log(result);
    });

    res.json({
        success : "success"
    })
});


router.get('/',function(req,res){

    ride.findOne({_id: '5dd888819fe2c720b808db76'}).populate('user', 'name').exec(function(err, result) {
        console.log('Story title: ', result);
        console.log('Story creator', result.user.name);
      });
});









// router.get('/', function (req, res) {

//     ride.find().exec().then(function (result) {

//         var rideDetails = [];
//         for (var i = 0; i < result.length; i++) {
//             rideDetails.push({
//                 from: result[i].from,
//                 to: result[i].to,
//                 cancel: result[i].cancel,
//                 fare: result[i].fare,
//                 time: moment(result[i].time).format('llll')
//             });
//         }
//             res.render("home", { data: rideDetails });
//             console.log(rideDetails);

//     }).catch(function (err) {
//         if (err) {
//             console.log(err);
//             res.json(err);
//         }
//     });

// });

module.exports = router;