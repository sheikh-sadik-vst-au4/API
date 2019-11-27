const express = require('express');
const router = express();
const hbs = require('./handlebars.js');
const moment = require('moment');
// const driver = require('./models/Driver.js');
const user = require('./models/User');
const database = require('./database.js');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'flashride',
    api_key: '552268597281925',
    api_secret: 'gRRgmj1IFTC7roM38TlWyG0Ec5I'
});

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.url === '/uploadimage') {
            var allowedType = ['image/png', 'image/jpg', 'image/jpeg'];
            if (allowedType.indexOf(file.mimetype) === -1) {
                return cb('Error invalid file type');
            }
        }
        return cb(null, 'public');

    },
    filename: function (req, file, cb) {
        var fileName = (new Date().getTime()) + "-" + file.originalname;
        return cb(null, fileName);
    }
});

const upload = multer({
    storage: fileStorage
});


database.connect();

router.engine(".hbs", hbs.engine);
router.set("view engine", ".hbs");

var imageName;

router.get('/', function (req, res) {

    user.findOne({ _id: '5ddcb0941c9d440000755e38' }).exec().then(function (result) {

        res.render("home", { data: result });
        imageName = result.imageurl;
        console.log(imageName);

    }).catch(function (err) {
        if (err) {
            console.log(err);
            res.json(err);
        }
    });

});

router.post('/uploadimage', upload.single('avtar'), function (req, res) {
    const filter = { _id: '5ddcb0941c9d440000755e38' };
    const update = { imageurl: req.file.filename };
    user.findOneAndUpdate(filter,update)
    .then(function (dbProduct) {
        // If we were able to successfully update a Product, send it back to the client
        res.json({"message" : dbProduct});
    })
    .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
    });

})

module.exports = router;