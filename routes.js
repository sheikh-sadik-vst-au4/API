const express = require('express');
const router = express.Router();

const User = require('./models/UserProfile.js');



router.get('/:email', function (req, res) {

    email = req.params.email;
    User.findById(email).exec().then(function(doc){
        res.json({
            success: doc
        })
    }).catch(function(err)
    {
        console.log(err);
    });

    res.json({
        success: req.params.email
    })
})

module.exports = router;