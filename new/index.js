const express = require('express');
const app = express();
bodyParser = require('body-parser');
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// connection start
const mongoose = require('mongoose');
const url = 'mongodb+srv://admin:admin@cluster0-4yqkc.mongodb.net/flashride?retryWrites=true&w=majority';
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false
}, function () {
    console.log("connection success");
});
// connection end

//import database model
const user = require('./model/Users');
const ride = require('./model/Rides');

app.get("/users", function (req, res) {
    user.find({})
        .then(function (dbUser) {
            res.json(dbUser);
        })
        .catch(function (err) {
            res.json(err);
        })
})

app.get("/rides", function (req, res) {
    ride.find({})
        .then(function (dbRide) {
            res.json(dbRide);
        })
        .catch(function (err) {
            res.json(err);
        })

})

app.post("/user", function (req, res) {
    user.create(req.body)
        .then(function (dbUser) {
            // If we were able to successfully create a User, send it back to the dashboard
            res.json(dbUser);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for creating a new Ride and updating user "rides" field with it
app.post("/user/:id", function (req, res) {
    // Create a new note and pass the req.body to the entry
    ride.create(req.body)
        .then(function (dbRide) {
            // If a Ride was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the user to be associated with the new Ride
            // { new: true } tells the query that we want it to return the updated user -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return user.findOneAndUpdate({ _id: req.params.id }, { $push: { rides: dbRide._id } }, { new: true });
        })
        .then(function (dbUser) {
            // If we were able to successfully update a user, send it back to the client
            res.json(dbUser);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Route for retrieving a Product by id and populating it's Review.
app.get("/user/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    user.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate('rides')
      .then(function(dbUser) {
        // If we were able to successfully find an user with the given id, send it back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

app.listen(5050, function () {
    console.log("connected at 5050");
})